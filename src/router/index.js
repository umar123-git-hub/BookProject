import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", name: "login", component: login },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: () => import("../views/dashboard/DashBoard.vue"),
    },
  ],
});

export default router;
