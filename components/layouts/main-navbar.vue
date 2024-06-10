<script setup lang="ts">
import { useAuthStore } from '../../store/auth.store';
const { currentUser } = useAuthStore()


</script>

<template>
  <div class="h-[10vh] fixed top-0 right-0 left-0 bg-gray-100 dark:bg-gray-900 z-50">
    <div class="container mx-auto flex items-center h-full justify-between">
      <NuxtLink to="/" class="flex items-center space-x-1">
        <NuxtImg src="/logo.svg" width="50" height="50" />
        <span class="text-4xl"> Jira </span>
      </NuxtLink>
      <div class="flex items-center space-x-2">
        <SharedColorMode />
        <template v-if="currentUser.status">
          <UButton color="red" variant="outline" class="font-bold">Log out</UButton>
          <NuxtLink to="/documents">
            <UButton color="blue" variant="outline">Documents</UButton>
          </NuxtLink>

        </template>
        <template v-else>
          <NuxtLink to="/auth">
            <UButton color="blue" variant="outline">Get it free</UButton>
          </NuxtLink>
          <NuxtLink to="/auth">
            <UButton color="blue" variant="soft">Sign In</UButton>
          </NuxtLink>

        </template>


      </div>
    </div>
  </div>
</template>