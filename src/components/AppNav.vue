<template>
  <div
    class="sticky top-0 w-max text-white h-screen py-4 bg-purple-900/80 flex flex-col items-center justify-between"
  >
    <!--================ LOGO --================-->
    <div class="flex flex-col justify-center lg:px-1 gap-3 items-center">
      <div class="p-0.5 h-max bg-white text-purple-900/80 rounded">
        <CheckCheck class="size-6 border border-white rounded"></CheckCheck>
      </div>
      <div class="text-center text-sm lg:text-base font-semibold">
        Task Flow
      </div>
    </div>
    <!--================ LOGO --================-->
    <!--=================== SELECTIONS ====================-->
    <div class="flex flex-col gap-5">
      <template
        v-for="routeSingle in routeArr"
        :key="routeSingle"
      >
        <div
          @click="changeRoute(routeSingle)"
          class="flex flex-col items-center cursor-pointer gap-2 px-1 lg:px-2 text-white"
        >
          <component :is="routeSingle.iconComponent" />
          <div class="text-xs">{{ routeSingle.routeName }}</div>
        </div>
      </template>
    </div>
    <!--=================== SELECTIONS ====================-->
    <!----------------- LogOut ----------------->
    <div
      @click="logOut"
      class="cursor-pointer pb- text-white"
    >
      <LogOut class="size-6"></LogOut>
    </div>
    <!----------------- LogOut ----------------->
  </div>
</template>
<script setup>
import {
  CheckCheck,
  Clock2,
  Folder,
  LayoutDashboard,
  LogOut,
} from "@lucide/vue";
import { ref } from "vue";
import { useUsersStore } from "../Store/UsersStore";
import router from "../router";

const userFromStore = useUsersStore();
const routeArr = ref([
  { iconComponent: LayoutDashboard, routeName: "DashBoard" },
  { iconComponent: Folder, routeName: "Projects" },
  { iconComponent: Clock2, routeName: "TimeLog" },
]);

const changeRoute = (r) => {
  router.push({ name: r.routeName });
};
const logOut = () => {
  userFromStore.loggedInUser = null;
  router.push("/");
};
</script>
