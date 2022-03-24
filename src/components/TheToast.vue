<script setup lang="ts">
import useToastStore from "../pinia/toastStore";
import infoSign from "../assets/info-sign.svg";

const toastStore = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div
      v-show="toastStore.showToast"
      class="fixed top-10 left-1/2 -translate-x-1/2 mx-auto my-0 px-3 md:px-5 py-3 bg-gray-100 drop-shadow-lg rounded-lg"
    >
      <img
        :src="infoSign"
        alt=""
        class="opacity-70 w-6 h-6 pb-1 mx-auto inline"
      />
      <span class="ml-1">{{ toastStore.msg }}</span>
    </div>
  </Teleport>
</template>
