CollectionItem
<script setup lang="ts">
import { Collection } from "../pinia/shopStore";
import CollectionItem from "./CollectionItem.vue";
const props = defineProps<{ collection: Collection }>();

const { title, items, routeName } = props.collection;
</script>

<template>
  <div class="flex flex-col gap-x-5 mb-7">
    <router-link
      :to="'/shop/' + routeName"
      class="text-3xl mb-6 cursor-pointer hover:text-gray-500"
    >
      {{ title }}
    </router-link>
    <div
      class="w-full grid grid-cols-2 md:grid-cols-4 gap-6 justify-between items-center"
    >
      <CollectionItem
        v-for="item in items.filter((item, idx) => idx < 4)"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
