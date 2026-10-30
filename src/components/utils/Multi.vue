<template>
  <div class="w-full border bg-white border-white relative">
    <div
      @click="showOptions = !showOptions"
      class="w-full px-2 flex items-center cursor-pointer"
    >
      <div class="text-xs w-full">{{ selected.length }} Selected</div>

      <chevron-down
        :class="showOptions ? 'rotate-180' : 'rotate-0'"
        class="size-5 transition-all duration-200"
      ></chevron-down>
    </div>
    <div
      v-if="showOptions"
      class="absolute top-full left-0 flex flex-col gap-1 px-2 py-1 bg-white w-full shadow-2xl border border-gray-400/70"
    >
      <template v-for="data in multiData">
        <label class="flex text-sm gap-1 cursor-pointer">
          <input
            type="checkbox"
            :value="data"
            v-model="selected"
          />
          <div class="line-clamp-1">{{ data[field] }}</div>
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
//  <template v-for="val in selected">
//         <div
//           @click="popFun(val)"
//           class="text-xs border hidden border-gray-400/70"
//         >
//           {{ val[field] }}
//         </div>
//       </template>
</script>
