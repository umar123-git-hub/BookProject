import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login.vue";
import { useUsersStore } from "../Store/UsersStore.js";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", name: "login", component: login },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: () => import("../views/dashboard/DashBoard.vue"),
      meta: { auth: true },
    },
    {
      path: "/projects",
      name: "Projects",
      component: () => import("../views/Projects/Projects.vue"),
      meta: { auth: true },
    },
    {
      path: "/timeLog",
      name: "TimeLog",
      component: () => import("../views/TimeLog/TimeLog.vue"),
      meta: { auth: true },
    },
  ],
});

router.beforeEach((to) => {
  const loggedUser = useUsersStore();
  if (!to.meta.auth) {
    return true;
  }
  if (to.meta.auth && loggedUser.loggedInUser !== null) {
    return true;
  }
  return "/";
});

export default router;
