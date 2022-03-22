<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import FormInput from "./FormInput.vue";
import CustomButton from "./CustomButton.vue";
import useUserStore from "../pinia/userStore";

const userStore = useUserStore();
const router = useRouter();

const credentials = reactive({
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  if (credentials.password !== credentials.confirmPassword) {
    alert("The passwords do not match");
    return;
  }

  try {
    await userStore.signUpWithEmail(
      credentials.displayName,
      credentials.email,
      credentials.password
    );
    router.replace("/");
  } catch (error) {
    console.error("Email sign up error: ", error);
    alert("somthing bad happened, please try again later");
  }
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
        class="w-full md:w-1/2 mx-auto"
        caption="SIGN UP"
      />
    </form>
  </div>
</template>
