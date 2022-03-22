<script lang="ts">
import { computed } from "vue";

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps(["modelValue", "label"]);
const emits = defineEmits(["update:modelValue"]);

const labelExtraClass = computed(() =>
  props.modelValue !== "" ? "shrink-label" : ""
);
</script>

<template>
  <div class="relative my-11">
    <input
      v-bind:="$attrs"
      class="form-input bg-none bg-white border-b-[1px] border-b-gray-500 text-lg p-1 block w-full appearance-none border-b-[1] my-6 outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label
      v-if="label"
      :class="labelExtraClass"
      class="form-input-label text-base absolute pointer-events-none left-1 top-3 transition-all duration-300 ease-linear text-gray-500"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.form-input:focus ~ .form-input-label {
  top: -1rem;
  font-size: 12px;
  color: black;
}

.form-input-label.shrink-label {
  top: -1rem;
  font-size: 12px;
  color: black;
}
</style>
