
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';


defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.name) errors.push({ path: "name", message: "Name required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" type="name" color="blue" size="lg" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" color="blue" size="lg" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" size="lg" />
    </UFormGroup>
    <div class="text-sm text-neutral-500">
      Siz registratsadan o'tganmisiz ?
      <span
        class="text-blue-500 underline"
        role="button"
        @click="$props.toggleLogin"
        >Sign in</span
      >
    </div>
    <UButton type="submit" class="mt-2" color="blue" block size="lg">
      Submit
    </UButton>
  </UForm>
</template>
