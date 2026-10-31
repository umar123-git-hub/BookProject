<template>
  <div
    class="absolute top-full max-h-48 overflow-auto z-40 left-0 rounded-lg flex flex-col gap-1 px-2 py-2 bg-white w-full shadow-2xl border border-gray-400/70"
  >
    <div class="flex gap-2 flex-wrap px-1">
      <template v-for="val in selected">
        <div
          class="text-xs px-1 py-0.5 flex justify-between gap-2 items-center bg-blue-500 text-white rounded"
        >
          <div>{{ val }}</div>
          <div
            @click="popFun(val)"
            class="cursor-pointer"
          >
            <X class="size-3"></X>
          </div>
        </div>
      </template>
    </div>
    <input
      type="text"
      class="outline-none border rounded-lg px-1 py-0.5"
      v-model="written"
      @keydown.enter="addWrittenFun"
    />
    <div class="flex flex-col gap-1.5">
      <template v-for="tag in tagArr">
        <label class="flex text-sm gap-1 cursor-pointer">
          <input
            type="checkbox"
            :value="tag"
            v-model="selected"
          />
          <div class="line-clamp-1">{{ tag }}</div>
        </label>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ChevronDown, Tags, X } from "@lucide/vue";
import { ref } from "vue";
// const props = defineProps({
//   multiData: {
//     type: Array,
//     Default: () => [],
//   },
//   field: {
//     type: String,
//     Default: () => "name",
//   },
// });
const selected = defineModel({ type: Array });
const showOptions = ref(true);
const written = ref("");

const tagArr = ref(["In-progress", "High", "Low", "Medium"]);

const popFun = (val) => {
  selected.value = selected.value.filter((i) => i !== val);
};
const addWrittenFun = () => {
  if (written.value.trim() === "") return;
  tagArr.value.push(written.value);
  written.value = "";
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
