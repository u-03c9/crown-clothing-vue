<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["title", "imageUrl", "size", "linkUrl"]);

const computedSize = computed(() =>
  props.size ? "h-48 md:h-96" : "h-48 md:h-60"
);
</script>

<template>
  <router-link
    class="menu-item cursor-pointer min-w-[30%] flex flex-auto items-center justify-center overflow-hidden mt-0 mb-4 mx-2 border-[1px] border-black"
    :to="linkUrl"
  >
    <div
      class="background-image w-full h-full bg-center bg-cover"
      :class="computedSize"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    />

    <div
      class="content h-16 md:h-24 px-2 md:px-6 flex flex-col items-center justify-center border-[1px] border-black opacity-70 absolute bg-white"
    >
      <h1 class="text-xl uppercase text-[#4a4a4a] font-bold">{{ title }}</h1>
      <span class="text-base font-thin">SHOP NOW</span>
    </div>
  </router-link>
</template>

<style>
.menu-item:hover .background-image {
  transform: scale(1.1);
  transition: transform 4s ease-in-out;
}

.menu-item:hover .content {
  opacity: 0.9;
}
</style>
