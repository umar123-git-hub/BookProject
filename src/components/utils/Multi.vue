<template>
  <div class="p-2 relative">
    <div class="px-2 py-1 flex gap-2">
      <div class="text-xs border border-gray-400/70 px-2 py-1">
        {{ selected.length }}
      </div>
      <template v-for="val in selected">
        <div
          @click="popFun(val)"
          class="text-xs hidden border border-gray-400/70 px-2 py-1"
        >
          {{ val[field] }}
        </div>
      </template>
      <div @click="showOptions = !showOptions">
        <chevron-down></chevron-down>
      </div>
    </div>
    <div
      v-if="showOptions"
      class="absolute top-full left-0 bg-white w-full p-2 shadow-2xl border border-gray-400/70"
    >
      <template v-for="data in multiData">
        <label class="flex gap-2">
          <input
            type="checkbox"
            :value="data"
            v-model="selected"
          />
          <div>{{ data[field] }}</div>
        </label>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ChevronDown } from "@lucide/vue";
import { ref } from "vue";
const props = defineProps({
  multiData: {
    type: Array,
    Default: () => [],
  },
  field: {
    type: String,
    Default: () => "name",
  },
});
const selected = defineModel({ type: Array });
const showOptions = ref(false);

const popFun = (val) => {
  selected.value = selected.value.filter((i) => i !== val);
};
</script>
