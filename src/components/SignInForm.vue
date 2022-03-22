<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import FormInput from "./FormInput.vue";
import CustomButton from "./CustomButton.vue";
import useUserStore from "../pinia/userStore";

const router = useRouter();
const userStore = useUserStore();

const credentials = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    await userStore.signInWithEmail(credentials.email, credentials.password);
    router.replace("/");
  } catch (error) {
    console.error("Email sign in error: ", error);
    alert("somthing bad happened, please try again later");
  }
};

const handleGoogleLogin = async () => {
  try {
    await userStore.signInWithGoogle();
    router.replace("/");
  } catch (error) {
    console.error("Google sign in error: ", error);
    alert("somthing bad happened, please try again later");
  }
};
</script>

<template>
  <div class="flex flex-col w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-3">I already have an account</h2>
    <span>Sign in with your email and password</span>

    <form @submit.prevent="handleSubmit">
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

      <div class="flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between">
        <CustomButton caption="Sign In" class="w-full" type="submit" />
        <CustomButton
          caption="Sign in with GOOGLE"
          class="w-full"
          type="button"
          @click="handleGoogleLogin"
          is-google-sign-in="true"
        />
      </div>
    </form>
  </div>
</template>
