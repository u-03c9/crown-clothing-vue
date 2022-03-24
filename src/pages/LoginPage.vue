<script setup lang="ts">
import { ref } from "vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";

const isLoading = ref(false);
</script>

<template>
  <div
    class="w-full flex flex-col lg:flex-row justify-center items-start gap-20 mt-20"
  >
    <SignInForm v-model:is-loading="isLoading" />
    <SignUpForm v-model:is-loading="isLoading" />
  </div>
</template>
