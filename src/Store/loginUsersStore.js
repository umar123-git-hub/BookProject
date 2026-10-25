import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginUsersStore = defineStore(
  "Users",
  () => {
    const allLoginUser = ref([]);
    return { allLoginUser };
  },
  {
    persist: true,
  },
);

// {userName:'talish',email:'talishalishoukat@gmail.com',password:'talish123'}
