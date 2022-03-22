<script setup lang="ts">
import { ref } from "vue";
import CollectionPreview from "../components/CollectionPreview.vue";
import useShopStore, { Collections } from "../pinia/shopStore";

const isLoading = ref(true);
const hasError = ref(false);

const collections = await useShopStore().getCollections();

isLoading.value = false;

if (!collections) {
  hasError.value = true;
  throw Error("Failed to load ShopPage");
}
</script>

<template>
  <div class="flex flex-col">
    <CollectionPreview
      v-if="!isLoading && !hasError"
      v-for="collection in collections"
      :collection="collection"
      :key="collection.id"
    />
  </div>
</template>
