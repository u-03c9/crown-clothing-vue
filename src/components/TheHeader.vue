<script setup lang="ts">
import { computed } from "vue";

import useCartStore from "../pinia/cartStore";
import useUserStore from "../pinia/userStore";

import logo from "../assets/crown.svg";
import CartIcon from "./CartIcon.vue";
import CartDropdown from "./CartDropdown.vue";

const userStore = useUserStore();
const cartStore = useCartStore();

const isUserLoggedIn = computed(() => !!userStore.currentUser);
</script>

<template>
  <div class="h-16 mb-6 mt-3 w-full flex justify-between items-center relative">
    <router-link to="/">
      <img :src="logo" />
    </router-link>

    <div
      class="flex-grow h-full flex items-center justify-end gap-x-2 sm:gap-x-4 md:gap-x-7 py-2.5 text-xs md:text-base"
    >
      <router-link to="/shop"> SHOP </router-link>
      <router-link to="/shop"> CONTACT </router-link>
      <div
        v-if="isUserLoggedIn"
        class="cursor-pointer"
        @click="userStore.signOut()"
      >
        SIGN OUT
      </div>
      <router-link v-else to="/login"> SIGN IN </router-link>
      <CartIcon v-if="isUserLoggedIn" />
      <CartDropdown v-show="isUserLoggedIn && cartStore.isMenuOpen"/>
    </div>
  </div>
</template>
