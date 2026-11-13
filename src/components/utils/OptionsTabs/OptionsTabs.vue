<template>
  <slot
    name="tabsDirectionSlot"
    :tabsArr="tabsArr"
    v-if="$slots.tabsDirectionSlot"
  ></slot>
  <div
    v-else
    class="flex relative items-center"
  >
    <template
      v-for="tab in tabsArr"
      :key="tab.name"
    >
      <div
        class="px-2 py-1 border border-blue-500 font-semibold text-xs md:text-sm bg-blue-200/70 hover:bg-blue-200 cursor-pointer transition-all duration-100 text-blue-700"
      >
        {{ tab.name }}
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  tabsArr: {
    type: Array,
    default: () => [],
  },
});
</script>
