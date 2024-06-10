<script setup lang="ts">
import { status } from '~/constants';
import { ACCOUNT } from '~/libs/appwrite';
import { useLoadingStore } from '~/store/loading.store';
import { useAuthStore } from '~/store/auth.store';
import { useStatusQuery } from '~/query/use-status-query';

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
const { data } = useStatusQuery()
</script>

<template>
    <div class="grid grid-cols-4 gap-2 mt-12">
        <UButton class="w-full h-12" color="blue" variant="outline" v-for="(item, index) in status" :key="index">
            <div class="flex items-center space-x-2">
                <span class="font-bold">{{ item.name }}</span>
                <span class="text-sm text-neutral-500">{{ item.items.length }}</span>
            </div>
        </UButton>
    </div>

</template>