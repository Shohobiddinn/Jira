<script setup lang="ts">
import { ACCOUNT } from '~/libs/appwrite';
import { useAuthStore } from '../store/auth.store';
import { useLoadingStore } from '~/store/loading.store';
const authStore = useAuthStore()
const loadingStore = useLoadingStore()
onMounted(() => {
  ACCOUNT.get().then((res) => {
    authStore.set({
      email: res.email,
      id: res.$id,
      name: res.name,
      status: res.status,
    })
  }).finally(() => {
    loadingStore.set(false);
  });
})

</script>

<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <template v-else>
    <LayoutsMainNavbar />
    <section class="min-h-screen bg-gray-200 dark:bg-black">
      <NuxtPage />
    </section>

  </template>
</template>