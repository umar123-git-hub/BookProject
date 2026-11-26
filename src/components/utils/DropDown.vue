<template>
  <div ref="dropdownRef" class="relative w-full h-max">
    <!-- SELECTED AREA -->

    <div @click="toggleDropdown" class="flex justify-between items-center">
      <slot
        v-if="$slots.dropSelectShow"
        name="dropSelectShow"
        :selected-drop="selectedDrop"
        :drops-panel-show="dropsPanelShow"
      ></slot>
      <div v-else class="flex justify-between w-full items-center">
        <div>
          {{ selectedDrop || "Please Select" }}
        </div>
        <ChevronDown
          :class="dropsPanelShow ? 'rotate-180' : 'rotate-0'"
          class="size-5 transition-all duration-300"
        />
      </div>
    </div>
    <!-- SELECTED AREA -->

    <!-- DROPDOWN OPTIONS -->
    <Transition name="dropsPanel">
      <div
        v-if="dropsPanelShow"
        class="absolute top-[110%] z-60 max-h-30 overflow-auto origin-top-right bg-gray-100 w-full py-1 flex flex-col gap-1"
      >
        <template v-for="drop in dropArr" :key="drop">
          <div @click="selectDrop(drop)" class="cursor-pointer w-full">
            <slot
              v-if="$slots.dropsPanel"
              name="singleDropPanel"
              :drop="drop"
            ></slot>
            <div v-else>
              {{ drop }}
            </div>
          </div>
        </template>
      </div>
    </Transition>
    <!-- DROPDOWN OPTIONS -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  dropArr: {
    type: Array,
    default: () => [],
  },
});

const selectedDrop = defineModel({ type: String });

const dropdownRef = ref(null);
const dropsPanelShow = ref(false);

const toggleDropdown = () => {
  dropsPanelShow.value = !dropsPanelShow.value;
};

const selectDrop = (drop) => {
  selectedDrop.value = drop;
  dropsPanelShow.value = false;
};

onClickOutside(dropdownRef, () => {
  dropsPanelShow.value = false;
});
</script>

<style scoped>
.dropsPanel-enter-active,
.dropsPanel-leave-active {
  transition: all 0.5s ease;
}

.dropsPanel-enter-from,
.dropsPanel-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
</style>
