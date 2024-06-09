
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { ACCOUNT,UNIQUE_ID } from '~/libs/appwrite'

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});
const isLoading = ref(false);
const error = ref('');
const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.name) errors.push({ path: "name", message: "Name required" });
  if (!state.password) errors.push({ path: "password", message: "Password required" });
  return errors;
};
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true;
  const {name ,email,password} = event.data;
  try{
    await ACCOUNT.create(UNIQUE_ID,email,password,name);
    props.toggleLogin()
    toast.add({
      title:"Account created",
      description:"Account created successfully",
    })
    isLoading.value = false

  }catch (e:any){
      error.value =e.message
      isLoading.value = false
  }
}
</script>

<template>
   <UAlert
    icon="i-heroicons-command-line"
    :description="error"
    title="Error !"
    color="red"
    variant="outline"
    v-if="error"
  />
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
    <UButton type="submit" class="mt-2" color="blue" block size="lg" :disabled="isLoading">
      <template v-if="isLoading">
      <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
      </template>
      <template v-else>
        Submit
      </template>
   
    </UButton>
  </UForm>
</template>
