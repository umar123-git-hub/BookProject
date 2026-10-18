<template>
  <div ref="dropdownRef" class="relative w-full z-50">
    <!-- SELECTED AREA -->
    <slot
      v-if="$slots.dropSelectShow"
      name="dropSelectShow"
      :selectedDrop="selectedDrop"
      :dropPanelShow="dropsPanelShow"
      :toggleDropdown="toggleDropdown"
    />

    <div
      v-else
      v-bind="$attrs"
      @click="toggleDropdown"
      class="flex justify-between items-center"
    >
      <div>{{ selectedDrop || "Please Select" }}</div>

      <ChevronDown
        :class="dropsPanelShow ? 'rotate-180' : 'rotate-0'"
        class="size-5 transition-all duration-300"
      />
    </div>
    <!-- SELECTED AREA -->

    <!-- DROPDOWN OPTIONS -->
    <Transition name="dropsPanel">
      <div
        v-if="dropsPanelShow"
        class="absolute top-[110%] h-30 overflow-auto origin-top-right bg-gray-100 dark:bg-gray-900 w-full py-1 flex flex-col gap-1"
      >
        <template v-for="drop in dropArr" :key="drop">
          <slot
            v-if="$slots.dropsPanel"
            name="dropsPanel"
            :drop="drop"
            :selectDrop="selectDrop"
          />

          <div
            v-else
            @click="selectDrop(drop)"
            class="px-2 py-1 hover:bg-emerald-300/30 hover:text-gray-900 text-gray-800 dark:text-gray-100 cursor-pointer"
          >
            {{ drop }}
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

defineProps({
  dropArr: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["other"]);

const selectedDrop = defineModel({ type: String });

const dropdownRef = ref(null);
const dropsPanelShow = ref(false);

const toggleDropdown = () => {
  dropsPanelShow.value = !dropsPanelShow.value;
};

const selectDrop = (drop) => {
  selectedDrop.value = drop;
  dropsPanelShow.value = false;
  emit("other", drop);
};

onClickOutside(dropdownRef, () => {
  dropsPanelShow.value = false;
});
</script>

<style scoped>
.dropsPanel-enter-active,
.dropsPanel-leave-active {
  transition: all 0.3s ease;
}

.dropsPanel-enter-from,
.dropsPanel-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
</style>
