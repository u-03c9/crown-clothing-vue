<script setup lang="ts">
import { computed } from "vue";

import useCartStore from "../pinia/cartStore";
import useUserStore from "../pinia/userStore";

import logo from "../assets/crown.svg";
import CartIcon from "./CartIcon.vue";
import CartDropdown from "./CartDropdown.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();

const isUserLoggedIn = computed(() => !!userStore.currentUser);

const handleSignOut = () => {
  userStore.signOut();
  router.push({ name: "home" });
};
</script>

<template>
  <div class="h-16 mb-6 mt-3 w-full flex justify-between items-center relative">
    <router-link to="/">
      <img
        :src="logo"
        alt="logo"
        class="w-[40px] sm:w-[50px] h-[31px] sm:h-[39px]"
      />
    </router-link>

    <div
      class="flex-grow h-full flex items-center justify-end gap-x-2 sm:gap-x-4 md:gap-x-7 py-2.5 text-xs md:text-base"
    >
      <router-link :to="{ name: 'home' }"> HOME </router-link>
      <router-link :to="{ name: 'shop' }"> SHOP </router-link>
      <div v-if="isUserLoggedIn" class="cursor-pointer" @click="handleSignOut">
        SIGN OUT
      </div>
      <router-link v-else :to="{ name: 'login' }"> SIGN IN </router-link>
      <CartIcon v-if="isUserLoggedIn" />
      <CartDropdown v-show="isUserLoggedIn && cartStore.isMenuOpen" />
    </div>
  </div>
</template>
