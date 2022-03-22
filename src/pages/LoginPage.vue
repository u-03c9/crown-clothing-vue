<script setup lang="ts">
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
</script>

<template>
  <div
    class="w-full flex flex-col lg:flex-row justify-center items-start gap-20 mt-20"
  >
    <SignInForm />
    <SignUpForm />
  </div>
</template>
