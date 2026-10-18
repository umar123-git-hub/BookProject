import { ref } from "vue";
import { defineStore } from "pinia";

export const useVariableStore = defineStore(
  "variable",
  () => {
    const routeSelect = ref("");
    return { routeSelect };
  },
  {
    persist: true,
  },
);
