<script setup lang="ts">
import DirectoryItem from "../components/DirectoryItem.vue";
import useDirectoryStore from "../pinia/directoryStore";

const directoryStore = useDirectoryStore();
const sections = directoryStore.sections;
</script>

<template>
  <div class="w-full flex flex-wrap justify-between mt-10 sm:mt-20">
    <DirectoryItem
      v-for="{ id, imageUrl, linkUrl, title, size } in sections"
      :key="id"
      :image-url="imageUrl"
      :link-url="linkUrl"
      :title="title"
      :size="size"
    />
  </div>
</template>
