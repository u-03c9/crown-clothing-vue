<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["isGoogleSignIn", "inverted", "caption"]);

const extraClass = computed(() => {
  if (props.isGoogleSignIn)
    return "bg-[#4285f4] text-white hover:bg-[#357ae8] border-none";

  if (props.inverted)
    return `bg-white text-black border-[1px] border-black
            hover:text-white hover:bg-black hover:border-none`;

  return `bg-black text-white
          hover:bg-white hover:text-black hover:border-[1px] hover:border-black`;
});
</script>

<template>
  <button
    :class="extraClass"
    class="font-bold cursor-pointer flex justify-center items-center disabled:cursor-not-allowed"
  >
    {{ caption }}
  </button>
</template>
