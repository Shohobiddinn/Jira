<script setup lang="ts">
import { ACCOUNT } from '~/libs/appwrite';
import { useAuthStore } from '../store/auth.store';
const authStore = useAuthStore()
onMounted(() => {
  ACCOUNT.get().then((res) => {
    authStore.set({
      email: res.email,
      id: res.$id,
      name: res.name,
      status: res.status,
    })
  });
})

</script>

<template>
  <LayoutsMainNavbar />
  <section class="min-h-screen bg-gray-200 dark:bg-black">
    <NuxtPage />
  </section>
</template>