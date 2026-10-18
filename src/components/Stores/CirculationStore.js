import { ref } from "vue";
import { defineStore } from "pinia";

export const useCirculationStore = defineStore(
  "circulation",
  () => {
    const circulations = ref([]);

    return {
      circulations,
    };
  },
  {
    persist: true,
  },
);
