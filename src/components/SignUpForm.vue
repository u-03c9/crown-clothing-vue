<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import FormInput from "./FormInput.vue";
import CustomButton from "./CustomButton.vue";
import useUserStore from "../pinia/userStore";
import useToastStore from "../pinia/toastStore";

const props = defineProps(["isLoading"]);
const emit = defineEmits(["update:isLoading"]);

const userStore = useUserStore();
const toastStore = useToastStore();
const router = useRouter();

const credentials = reactive({
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  if (credentials.password !== credentials.confirmPassword) {
    toastStore.displayToast("The passwords do not match!", 5);
    return;
  }

  emit("update:isLoading", true);
  toastStore.displayToast("Loading ...", 9000);
  try {
    await userStore.signUpWithEmail(
      credentials.displayName,
      credentials.email,
      credentials.password
    );
    router.replace("/");
  } catch (error) {
    console.error("Email sign up error: ", error);
    toastStore.displayToast(error, 5);
  }
  emit("update:isLoading", false);
};
</script>

<template>
  <div class="flex flex-col w-full max-w-md mx-auto">
    <h2 class="font-bold text-2xl mb-3">I do not have an account</h2>
    <span>Sing up with your email and password</span>
    <form @submit.prevent="handleSubmit">
      <FormInput
        type="text"
        name="displayName"
        label="Display Name"
        v-model="credentials.displayName"
        required
      />
      <FormInput
        type="email"
        name="email"
        label="Email"
        v-model="credentials.email"
        required
      />
      <FormInput
        type="password"
        name="password"
        label="Password"
        v-model="credentials.password"
        required
      />
      <FormInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        v-model="credentials.confirmPassword"
        required
      />
      <CustomButton
        type="submit"
        class="w-full md:w-1/2 mx-auto uppercase h-12"
        caption="SIGN UP"
        :disabled="isLoading"
      />
    </form>
  </div>
</template>
