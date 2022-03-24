<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import FormInput from "./FormInput.vue";
import CustomButton from "./CustomButton.vue";
import useUserStore from "../pinia/userStore";
import useToastStore from "../pinia/toastStore";

const props = defineProps(["isLoading"]);
const emit = defineEmits(["update:isLoading"]);

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const credentials = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  emit("update:isLoading", true);
  toastStore.displayToast("Loading ...", 9000);
  try {
    await userStore.signInWithEmail(credentials.email, credentials.password);
    router.replace("/");
  } catch (error) {
    console.error("Email sign in error: ", error);
    toastStore.displayToast(error, 5);
  }
  emit("update:isLoading", false);
};

const handleGoogleLogin = async () => {
  emit("update:isLoading", true);
  toastStore.displayToast("Loading ...", 9000);
  try {
    await userStore.signInWithGoogle();
    router.replace("/");
  } catch (error) {
    console.error("Google sign in error: ", error);
    toastStore.displayToast(error, 5);
  }
  emit("update:isLoading", false);
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
        <CustomButton
          caption="Sign In"
          class="w-full h-12 uppercase"
          type="submit"
          :disabled="isLoading"
        />
        <CustomButton
          caption="Sign in with GOOGLE"
          class="w-full h-12 uppercase"
          type="button"
          @click="handleGoogleLogin"
          is-google-sign-in="true"
          :disabled="isLoading"
        />
      </div>
    </form>
  </div>
</template>
