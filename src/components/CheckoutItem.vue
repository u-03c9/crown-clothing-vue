<script setup lang="ts">
import useCartStore, { CartItem } from "../pinia/cartStore";
const props = defineProps<{ cartItem: CartItem }>();

const { quantity, ...item } = props.cartItem;
const { imageUrl, price, name } = item;

const cartStore = useCartStore();
</script>

<template>
  <div
    className="w-full grid grid-cols-5 sm:grid-cols-9 min-h-[50px] items-center text-center text-sm sm:text-base"
  >
    <div className="w-10 sm:w-20 sm:col-span-2 mx-auto">
      <img :src="imageUrl" className="" alt="item" />
    </div>
    <span className="sm:col-span-2">{{ name }}</span>
    <span
      className="sm:col-span-2 select-none flex flex-row justify-center gap-x-2"
    >
      <div
        className="hover:opacity-70 sm:p-2 cursor-pointer"
        @click="cartStore.removeItemFromCart(item)"
      >
        &#10094;
      </div>
      <span className="sm:py-2">{{ cartItem.quantity }}</span>
      <div
        className="hover:opacity-70 sm:p-2 cursor-pointer"
        @click="cartStore.addItemToCart(item)"
      >
        &#10095;
      </div>
    </span>
    <span className="sm:col-span-2">${{ cartItem.quantity * price }}</span>
    <div
      className="sm:col-span-1 cursor-pointer hover:opacity-70"
      @click="cartStore.clearItemFromCart(item)"
    >
      &#10005;
    </div>
  </div>
</template>
