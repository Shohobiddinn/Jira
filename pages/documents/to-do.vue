<script setup lang="ts">
import { useDeals } from '~/query/use-deals';
import { EnumStatus } from '~/types';
import { useCurrentDealStore } from '~/store/current-deal.store';
import { Slideover } from '../../.nuxt/components';

definePageMeta({ layout: 'documents' })
useHead({ title: 'To Do | Jira' })

const { set } = useCurrentDealStore()
const { data, refetch, isLoading } = useDeals(EnumStatus.todo)
</script>
<template>
    <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold">To Do</h1>
        <SharedCreateDeal status="to-do" :refetch="refetch" />
    </div>
    <UDivider />
    <div class=" grid grid-cols-4 gap-2" v-if="!isLoading">
        <div class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
            v-for="(item, index) in Array.from({ length: 4 })" :key="index">
            <USkeleton class="w-10/12 h-4" />
            <USkeleton class="w-full h-1 my-3" />
            <USkeleton class="w-full h-8" />
            <USkeleton class="w-full h-6 mt-3" />
        </div>
    </div>
    <div class=" grid grid-cols-4 gap-2" v-else>
        <div v-if="data?.length">

            <div class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation" v-for="(deal, index) in data"
                :key="index" role="button" @click="set(deal)">
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
    <Slideover />
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