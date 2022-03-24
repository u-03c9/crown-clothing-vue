<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import useCartStore from "../pinia/cartStore";
import CustomButton from "./CustomButton.vue";
import CartItem from "./CartItem.vue";

const cartStore = useCartStore();
const router = useRouter();

const goToCheckout = () => {
  cartStore.closeMenu();
  router.push({ name: "checkout" });
};

const dismissMenuListener = () => {
  cartStore.closeMenu();
};

onMounted(() => {
  window.addEventListener("click", dismissMenuListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", dismissMenuListener);
});
</script>

<template>
  <div
    class="absolute w-60 h-96 flex flex-col p-5 top-14 right-0 bg-white border-black border-[1px] z-20"
    @click.stop
  >
    <div
      class="grow flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar"
    >
      <CartItem
        v-if="cartStore.items.length"
        v-for="item in cartStore.items"
        :cart-item="item"
      />
      <span v-else class="text-lg mx-auto grow pt-[25%]">
        Your cart is empty
      </span>
    </div>
    <CustomButton
      class="mt-auto w-full py-3"
      caption="GO TO CHECKOUT"
      @click="goToCheckout"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-color: #aaa;
  scrollbar-width: 0.4rem;
}

.custom-scrollbar::-webkit-scrollbar {
  background-color: #fff;
  width: 0.4rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #aaa;
}
</style>
