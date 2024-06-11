<script setup lang="ts">
import { useEditDealStore } from '~/store/edit-deal.store';
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useMutation } from '@tanstack/vue-query';
import { DATABASE } from '~/libs/appwrite';
import { COLLECTION_DEALS, DB_ID } from '~/constants';

const props = defineProps({
    refetch: {
        type: Function,
        required: true,
    }

})
const toast = useToast()
const store = useEditDealStore()

const state = reactive({
    name: store.deal?.name,
    description: store.deal?.description
})
const validate = (state: any): FormError[] => {
    const errors: FormError[] = []
    if (!state.name) errors.push({ path: 'name', message: 'Name is required' })
    if (!state.description) errors.push({ path: 'description', message: 'description is required' })

    return errors
}

const isLocalOpen = computed({
    get: () => store.isOpen,
    set: value => (store.isOpen = value),
})
watch(
    () => store.deal,
    () => {
        state.name = store.deal?.name
        state.description = store.deal?.description
    }
)
const { isPending, mutate } = useMutation({
    mutationKey: ['edit-deal', store.deal?.$id],
    mutationFn: (data: { id: string, name: string, description: string }) =>
        DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, data.id, {
            name: data.name,
            description: data.description
        }),
    onSuccess: () => {
        props.refetch()
        isLocalOpen.value = false
        toast.add({
            title: 'Success',
            description: 'Deal tahrirlandi'
        })
    },
    onError: (err) => {
        toast.add({
            title: 'Error',
            description: err.message
        })
    }


})
async function onSubmit(event: FormSubmitEvent<any>) {
    const { name, description } = event.data;
    mutate({
        id: store.deal?.$id!, name, description,
    })
}

</script>

<template>

    <UModal v-model="isLocalOpen">
        <div class="p-4">
            <h1 class="text-2xl font-bold">Dealni tahrirlash</h1>
            <UDivider />
            <div class=" p-4  dark:bg-gray-900 bg-gray-100">

                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="state.name" color="blue" size="lg" />
                    </UFormGroup>
                    <UFormGroup label="description" name="description">
                        <UTextarea v-model="state.description" color="blue" size="lg" />
                    </UFormGroup>
                    <UButton type="submit" class="mt-2" color="blue" block size="lg" :disabled="isPending">
                        <template v-if="isPending">
                            <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
                        </template>
                        <template v-else>
                            Submit
                        </template>

                    </UButton>
                </UForm>
            </div>
        </div>
    </UModal>

</template>