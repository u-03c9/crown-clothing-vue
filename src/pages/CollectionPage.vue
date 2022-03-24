<script setup lang="ts">
import CollectionItem from "../components/CollectionItem.vue";
import useShopStore from "../pinia/shopStore";

const props = defineProps<{ collectionId: string }>();
const shopStore = useShopStore();

const collection = await shopStore.getCollectionById(props.collectionId);
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-7">{{ collection!.title }}</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
      <CollectionItem
        v-for="item in collection!.items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
