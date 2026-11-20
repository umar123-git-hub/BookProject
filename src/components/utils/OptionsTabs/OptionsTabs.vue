<template>
  <div
    class="flex relative w-full items-center"
    :class="tabsDirection == 'row' ? 'flex-row gap-2' : 'flex-col gap-1'"
  >
    <template
      v-for="tab in tabsArr"
      :key="tab"
    >
      <div
        @click="model = tab"
        :class="tabsDirection == 'row' ? 'w-max' : 'w-full'"
      >
        <slot
          name="tabSlot"
          v-if="$slots.tabSlot"
          :tab="tab"
        ></slot>
        <div v-else>
          {{ tab }}
        </div>
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
  tabsDirection: {
    type: String,
    default: () => "row",
  },
});

const model = defineModel({ type: String });
</script>
