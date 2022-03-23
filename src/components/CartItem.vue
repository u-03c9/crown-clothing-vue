<script setup lang="ts">
import { CartItem } from "../pinia/cartStore";

const props = defineProps<{ cartItem: CartItem }>();
const { name, price, imageUrl } = props.cartItem;
</script>

<template>
  <div class="w-full flex h-20 mb-4">
    <img :src="imageUrl" class="w-1/3" alt="" />
    <div class="w-2/3 flex flex-col items-start justify-center py-2 px-5">
      <span>{{ name }}</span>
      <span>{{ cartItem }} X ${{ price }}</span>
    </div>
  </div>
</template>
