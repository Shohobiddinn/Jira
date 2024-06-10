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
const { data, isLoading, refetch } = useStatusQuery()

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
        <div v-for="(item, index) in data" :key="index">
            <UButton class="w-full h-12" color="blue" variant="outline">
                <div class="flex items-center space-x-2">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="text-sm text-neutral-500">{{ item.items.length }}</span>
                </div>
            </UButton>
            <SharedCreateDeal :status="item.id" :refetch="refetch" />
            <div class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation" v-for="deal in item.items"
                :key="deal.$id" role="button" draggable="true">
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