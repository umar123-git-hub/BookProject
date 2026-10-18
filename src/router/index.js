import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
// import BooksParent from "../components/BookFolder/Books/BooksParent.vue";
// import MembersParent from "../components/BookFolder/Members/MembersParent.vue";
// import Circulation from "../components/BookFolder/Circulation/CirculationParent.vue";
// import PublisherParent from "../components/BookFolder/Publisher/PublisherParent.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/Books",
      name: "Books",
      component: () => import("../components/LMSProject/BookParent.vue"),
    },
    {
      path: "/Members",
      name: "Members",
      component: () => import("../components/LMSProject/MemberParent.vue"),
    },
    {
      path: "/Circulations",
      name: "Circulations",
      component: () => import("../components/LMSProject/CirculationParent.vue"),
    },
    // {
    //   path: "/Books",
    //   component: BooksParent,
    // },
    // {
    //   path: "/Members",
    //   component: MembersParent,
    // },
    // {
    //   path: "/Circulation",
    //   component: Circulation,
    // },
    // {
    //   path: "/Publisher",
    //   component: PublisherParent,
    // },
  ],
});

export default router;
