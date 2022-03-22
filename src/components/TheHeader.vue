<script setup lang="ts">
import { ref } from "vue";
import logo from "../assets/crown.svg";
import useUserStore from "../pinia/userStore";

const userStore = useUserStore();
</script>

<template>
  <div class="h-16 mb-6 mt-3 w-full flex justify-between items-center relative">
    <router-link to="/">
      <img :src="logo" />
    </router-link>

    <div
      class="flex-grow h-full flex items-center justify-end gap-x-2 sm:gap-x-4 md:gap-x-7 py-2.5"
    >
      <router-link to="/shop"> SHOP </router-link>
      <router-link to="/shop"> CONTACT </router-link>
      <div v-if="userStore.currentUser" class="cursor-pointer">SIGN OUT</div>
      <router-link v-else to="/login"> SIGN IN </router-link>
    </div>
  </div>
</template>
