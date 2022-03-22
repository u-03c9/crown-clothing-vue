<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheSpinner from "../components/TheSpinner.vue";
import CollectionItem from "../components/CollectionItem.vue";
import useShopStore from "../pinia/shopStore";

const router = useRouter();
const props = defineProps<{ collectionId: string }>();
const shopStore = useShopStore();

const isLoading = ref(true);
const hasError = ref(false);

const collection = await shopStore.getCollectionById(props.collectionId);
isLoading.value = false;

if (!collection) {
  hasError.value = true;
  router.push({ name: "not-found" });
}
</script>

<template>
  <div>
    <TheSpinner v-if="isLoading" />
    <div v-else-if="!isLoading && !hasError">
      <h1 class="text-4xl text-center mb-7">{{ collection!.title }}</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
        <CollectionItem
          v-for="item in collection!.items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
