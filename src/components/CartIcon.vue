<script setup lang="ts">
import shoppingBag from "../assets/shopping-bag.svg";
import useCartStore from "../pinia/cartStore";

const cartStore = useCartStore();
</script>

<template>
  <div
    class="w-fit h-fit relative flex pb-2 cursor-pointer select-none"
    @click.stop="cartStore.toggleMenu()"
  >
    <img :src="shoppingBag" class="w-7 h-7" alt="" />
    <span class="absolute w-full text-center text-xs bottom-2.5">
      {{ cartStore.itemsCount }}
    </span>
  </div>
</template>
