<template>
  <div class="w-full relative">
    <div
      @click="showOpsFun"
      class="w-full"
    >
      <slot
        name="multiHead"
        v-if="$slots.multiHead"
        :selected="selected"
      ></slot>
      <div
        v-else
        class="text-xs w-full px-2 flex items-center justify-between cursor-pointer"
      >
        <div>{{ selected.length }} Selected</div>
        <chevron-down
          :class="showOptions ? 'rotate-180' : 'rotate-0'"
          class="size-5 transition-all duration-200"
        ></chevron-down>
      </div>
    </div>
    <Transition name="multiDropTransition">
      <slot
        name="multiDrop"
        v-if="$slots.multiDrop"
        :showOptions="showOptions"
        :multiData="multiData"
        :model="selected"
      ></slot>
      <div
        v-else
        v-if="showOptions"
        class="absolute top-full left-0 flex flex-col gap-1 px-2 py-1 bg-white w-full shadow-2xl border border-gray-400/70"
      >
        <template
          v-for="data in multiData"
          :key="data"
        >
          <label class="flex text-sm gap-1 cursor-pointer">
            <slot name="inputSlot"></slot>
            <input
              type="checkbox"
              :value="data"
              v-model="selected"
            />
            <slot
              name="multiSingleName"
              v-if="$slots.multiSingleName"
              :data-single="data[field]"
            ></slot>
            <div
              v-else
              class="line-clamp-1"
            >
              {{ data[field] }}
            </div>
          </label>
        </template>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ChevronDown } from "@lucide/vue";
import { ref, Transition } from "vue";
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
const showOpsFun = () => {
  showOptions.value = !showOptions.value;
};
const popFun = (val) => {
  selected.value = selected.value.filter((i) => i !== val);
};
</script>
<style scoped>
.multiDropTransition-enter-from,
.multiDropTransition-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.multiDropTransition-enter-active,
.multiDropTransition-leave-active {
  transition: all 0.5s ease;
}
</style>
