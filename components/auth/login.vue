<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from '~/store/auth.store';

defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});
const isLoading = ref(false);
const error = ref("");
const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Email required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true
  const { email, password } = event.data

  try {
    await ACCOUNT.createEmailSession(email, password)
    const response = await ACCOUNT.get()
    authStore.set({
      email: response.email,
      id: response.$id,
      name: response.name,
      status: response.status,
    })
    toast.add({
      title: 'Logged in',
      description: 'You are now logged in',
    })
    
    await router.push('/')
  } catch (e: any) {
    error.value = e.message
    isLoading.value = false
  }
}
</script>

<template>
  <UAlert icon="i-heroicons-command-line" :description="error" title="Error !" color="red" variant="outline"
    v-if="error" />
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" color="blue" size="lg" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" size="lg" />
    </UFormGroup>
    <div class="text-sm text-neutral-500">
      Siz registratsadan o'tmaganmisiz ?
      <span class="text-blue-500 underline" role="button" @click="$props.toggleLogin">Sign up</span>
    </div>
    <UButton type="submit" class="mt-2" color="blue" block size="lg">
      Submit
    </UButton>
  </UForm>
</template>
