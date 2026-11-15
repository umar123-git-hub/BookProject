import { ref } from "vue";
import { defineStore } from "pinia";

export const useUsersStore = defineStore(
  "Users",
  () => {
    const loggedInUser = ref(null);
    const loadMarker = ref(false);
    const refreshMarker = ref(0);
    const allUser = ref([]);
    return { allUser, loggedInUser, loadMarker, refreshMarker };
  },
  {
    persist: true,
  },
);

// {
//   userName: "umar",
//   name: "Umar Naeem",
//   email: "umarnaeem027@gmail.com",
//   password: "umar123",
//   pfp:''
// },
// {
//   userName: "talish",
//   name: "Talish Ali Shoukat",
//   email: "talishalishokat@gmail.com",
//   password: "talish123",
//   pfp:'/src/assets/ta.jpg'
// },
// {
//   userName: "toheed",
//   name: "Toheed Ali",
//   email: "toheedali0809@gmail.com",
//   password: "toheed123",
//   pfp:'/src/assets/th.jpg'
// },
