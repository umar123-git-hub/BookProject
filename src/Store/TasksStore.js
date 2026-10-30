import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore(
  "tasks",
  () => {
    const allTasks = ref([]);

    return { allTasks };
  },
  { persist: true },
);
