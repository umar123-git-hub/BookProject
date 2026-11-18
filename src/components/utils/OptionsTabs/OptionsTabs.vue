<template>

  <div
    class="flex "
    :class="tabsStyle"
  >
    <template
      v-for="tab in tabsArr"
      :key="tab.name"
    >
    <slot
    name="tabsDirectionSlot"
    :tabs="tab.name"
    :model="model"
    v-if="$slots.tabsDirectionSlot"
  ></slot>
      <div @click="model=tab.name" v-else
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
  tabsStyle:String,
});

const model = defineModel ({
  type: String,
})
</script>
