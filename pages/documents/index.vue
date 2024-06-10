<script setup lang="ts">
import { COLLECTION_DEALS, DB_ID, status } from '~/constants';
import { ACCOUNT, DATABASE } from '~/libs/appwrite';
import { useLoadingStore } from '~/store/loading.store';
import { useAuthStore } from '~/store/auth.store';
import { useStatusQuery } from '~/query/use-status-query';
import { useMutation } from '@tanstack/vue-query';
import type { IColumn, IDeal } from '~/types';

definePageMeta({ layout: 'documents' })
const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()
onMounted(() => {
    ACCOUNT.get().then((res) => {
        loadingStore.set(false)
        authStore.set({
            email: res.email,
            name: res.name,
            id: res.$id,
            status: res.status
        })
    }).catch(() => router.push('/auth'))
})
const { data, isLoading, refetch } = useStatusQuery()
const dragCardRef = ref<IDeal | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const isMoving = ref(false)
const { isPending, mutate } = useMutation({
    mutationKey: ['moveCard'],
    mutationFn: ({ docId, status }: { docId: string, status: string }) => DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
    onSuccess: () => refetch()
})
const handleDragStart = (card: IDeal, column: IColumn) => {
    isMoving.value = true;
    dragCardRef.value = card;
    sourceColumnRef.value = column
}
const handleDragOver = (event: DragEvent) => {
    event.preventDefault();

}
const handleDrop = (column: IColumn) => {
    isMoving.value = false;
    if (dragCardRef.value && sourceColumnRef.value) {
        mutate({ docId: dragCardRef.value.$id, status: column.id })
    }
}
console.log(isMoving.value);

</script>

<template>
    <div class="grid grid-cols-4 gap-2 mt-12" v-if="isLoading">
        <USkeleton class="h-12  dark:bg-gray-900 bg-gray-100" />
        <USkeleton class="h-12  dark:bg-gray-900 bg-gray-100" />
        <USkeleton class="h-12  dark:bg-gray-900 bg-gray-100" />
        <USkeleton class="h-12  dark:bg-gray-900 bg-gray-100" />
        <UiDealsLoader class="dark:bg-gray-900 bg-gray-100" />
        <UiDealsLoader class="dark:bg-gray-900 bg-gray-100" />
        <UiDealsLoader class="dark:bg-gray-900 bg-gray-100" />
        <UiDealsLoader class="dark:bg-gray-900 bg-gray-100" />

    </div>
    <div class="grid grid-cols-4 gap-2 mt-12" v-else>
        <div class="px-1"
            :class="{ 'border-l-2 border-r-2 border-dotted h-screen dark:border-gray-900 border-gray-200 ' : isMoving}"
            @dragover="handleDragOver" @drop="() => handleDrop(item)" v-for="(item, index) in data" :key="index">
            <UButton class="w-full h-12" color="blue" variant="outline">
                <div class="flex items-center space-x-2">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="text-sm text-neutral-500">{{ item.items.length }}</span>
                </div>
            </UButton>
            <SharedCreateDeal :status="item.id" :refetch="refetch" />
            <div class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation" :class="{'opacity-50' : isPending}" v-for="deal in item.items"
                :key="deal.$id" role="button" draggable="true" @dragstart="() => handleDragStart(deal, item)">
                <div class="flex items-center space-x-2" role="button">
                    <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
                </div>

                <UDivider class="my-3" />

                <div class="opacity-55 text-sm line-clamp-1">
                    {{ deal.description }}
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
@keyframes show {
    from {
        transform: scale(0.5) translateY(-30px);
        opacity: 0.4
    }

    to {
        transform: scale(1) translateY();
        opacity: 1;
    }
}

.animation {
    animation: show 0.3s ease-in-out;
}
</style>