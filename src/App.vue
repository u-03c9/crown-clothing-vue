<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheSpinner from "./components/TheSpinner.vue";
</script>

<template>
  <div class="px-10 md:px-20 lg:mx-auto py-5 w-full max-w-[1290px]">
    <TheHeader />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <Suspense>
            <component :is="Component" />
            <template #fallback> <TheSpinner /> </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<style></style>
