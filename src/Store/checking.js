import { ref } from "vue";
import { defineStore } from "pinia";

export const useCheckStore = defineStore(
  "checking",
  () => {
    const check = ref(0);
    return{check}
  },
  {
    persist: true,
  }
);