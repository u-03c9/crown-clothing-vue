<script setup lang="ts">
import useCartStore from "../pinia/cartStore";
import { CollectionItem } from "../pinia/shopStore";
import CustomButton from "./CustomButton.vue";
const props = defineProps<{ item: CollectionItem }>();

const cartStore = useCartStore();
</script>

<template>
  <div class="collection-item w-full flex flex-col items-center relative">
    <div class="container">
      <div
        class="image"
        :style="{ backgroundImage: `url(${item.imageUrl})` }"
      />
    </div>
    <div class="w-full h-14 flex justify-between text-lg leading-none pt-2">
      <span class="grow">{{ item.name }}</span>
      <span class="w-fit">${{ item.price }}</span>
    </div>
    <CustomButton
      caption="ADD TO CART"
      inverted="true"
      class="custom-button min-w-[80%] max-w-[10rem] opacity-70 absolute bottom-20"
      @click="cartStore.addItemToCart(item)"
    />
  </div>
</template>

<style scoped>
.custom-button {
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
}

.container {
  position: relative;
}

.container:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: calc((175 / 117) * 100%);
}

.container > .image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.collection-item:hover .image {
  opacity: 0.8;
}

.collection-item:hover .custom-button {
  opacity: 0.85;
  display: flex;
}
</style>
