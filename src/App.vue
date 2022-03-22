<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <div class="px-10 md:px-20 lg:mx-auto py-5 w-full max-w-[1290px]">
    <TheHeader />
    <router-view />
  </div>
</template>

<style></style>
