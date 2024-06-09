<script setup lang="ts">
import { tabs } from "~/constants";

useHead({ title: "Bosh sahifa" });
</script>

<template>
  <!-- HERO SECTION -->
  <section
    class="flex items-center justify-between h-[100vh] pt-[10vh] gap-4 bg-gradient-to-t from-white dark:from-black to-blue-500 dark:to-blue-950"
  >
    <div class="pl-20 flex flex-col space-y-3 w-[50%]">
      <h1 class="text-5xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </h1>
      <p class="text-lg opacity-80">
        Ipsum architecto molestiae, officiis labore sed consequatur illum odio
        modi nam commodi reprehenderit adipisci qui sequi soluta velit fugiat
        laborum voluptas. Laborum.
      </p>
      <nuxt-link to="/auth">
        <UButton color="blue">Try it free</UButton>
      </nuxt-link>
    </div>
    <div class="w-[50%]">
      <NuxtImg src="/hero.webp" width="50%" />

    </div>
  </section>
  <!-- Tab -->
  <section>
    <h1 class="text-4xl">Lorem ipsum dolor sit amet consectetur.</h1>
    <UTabs :items="tabs" class="mt-6 px-4" :ui="{ list: { width: 'w-fit' } }">
      <template #item="{ item }">
        <div class="flex items-start justify-between gap-6">
          <div class="flex flex-col space-y-3 w-[40%]">
            <h2 class="text-3xl">{{ item.label }}</h2>
            <p class="text-lg opacity-80 mt-xl">{{ item.description }}</p>
            <div
              class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-t from-white dark:from-black to-blue-500 dark:to-blue-800"
            >
              <Icon name="bx:bxs-quote-alt-left" class="text-7xl" />
              <p class="text-lg pl-2">{{ item.credentials.text }}</p>
              <p class="text-lg pl-2">{{ item.credentials.username }}</p>
              <p class="text-lg pl-2">{{ item.credentials.company }}</p>

            </div>
          </div>
          <div class="w-[50%]">
            <NuxtImg :src="item.image" class="w-70%" />
          </div>
        </div>
      </template>
    </UTabs>
  </section>
</template>


<style lang="scss" scoped>
</style>