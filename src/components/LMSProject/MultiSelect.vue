<template>
  <div class="relative w-full">
    <div
      @click="multiDropShow = !multiDropShow"
      class="p-2 flex justify-between items-center cursor-pointer overflow-auto transition-all duration-500 bg-page border border-gray-50/0 hover:border-emerald-500/20 shadow-sm hover:shadow-sm shadow-black/40 dark:shadow-emerald-200 rounded-xl"
    >
      <div v-if="model.length === 0" class="text-sm text-main">
        Select Users
      </div>
      <div v-else class="grid grid-cols-3 h-5.5 items-center gap-1">
        <template v-for="single in model" :key="single">
          <div class="text-xs px-2 py-1 grad-header text-main rounded">
            {{ single.name }}
          </div>
        </template>
      </div>
      <ChevronDown
        :class="multiDropShow ? 'rotate-180' : 'rotate-0'"
        class="size-5 text-main transition-all duration-300"
      ></ChevronDown>
    </div>
    <Transition name="mainDrop">
      <div
        v-if="multiDropShow"
        class="absolute origin-top cursor-pointer top-full h-[700%] pt-2 w-full overflow-auto rounded-2xl shadow-black/40 shadow-2xl z-20 flex flex-col gap-1 bg-amber-50/70 dark:bg-cyan-400/70"
      >
        <div class="bg-page rounded-2xl w-full px-2 py-3">
          <template v-for="multi in multiArr" :key="multi">
            <label
              @click="multiFun(multi)"
              class="flex gap-2 hover:bg-emerald-50 px-1 py-1 dark:text-main text-emerald-950 dark:hover:text-gray-900 items-center cursor-pointer"
            >
              <input
                type="checkbox"
                class="accent-green"
                :value="multi"
                v-model="model"
              />
              <div>{{ multi.name }}</div>
            </label>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ChevronDown } from "@lucide/vue";
import { ref } from "vue";

const props = defineProps({
  multiArr: Array,
});
const multiDropShow = ref(false);
const model = defineModel({
  type: Array,
});
const multiFun = (multi) => {
  console.log(model.value);
};
</script>
<style scoped>
.mainDrop-enter-active,
.mainDrop-leave-active {
  transition: all 0.5s ease;
}

.mainDrop-enter-from,
.mainDrop-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
.deepTransition-enter-active,
.deepTransition-leave-active {
  transition: all 0.3s ease-in-out;
  /* transform: translateY(0px); */
}

.deepTransition-enter-from,
.deepTransition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
