import { ref } from "vue";
import { defineStore } from "pinia";

export const useUsersLoginInfoStore = defineStore(
  "userInfo",
  () => {
    const allUserInfo = ref([]);
    return { allUserInfo };
  },
  {
    persist: true,
  },
);
