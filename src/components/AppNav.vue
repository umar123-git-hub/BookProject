<template>
  <div
    class="sticky top-0 w-max z-10 text-white h-screen py-4 bg-purple-900/80 flex flex-col items-center justify-between"
  >
    <!--================ LOGO --================-->
    <div class="flex flex-col justify-center lg:px-1 gap-3 items-center">
      <div class="p-0.5 h-max bg-white text-purple-900/80 rounded">
        <CheckCheck
          class="size-5 lg:size-6 border border-white rounded"
        ></CheckCheck>
      </div>
      <div class="text-center text-sm lg:text-base font-semibold">
        Task Flow
      </div>
    </div>
    <!--================ LOGO --================-->
    <!--=================== SELECTIONS ====================-->
    <div class="flex flex-col gap-5">
      <template v-for="routeSingle in routeArr" :key="routeSingle">
        <div
          @click="changeRoute(routeSingle)"
          class="flex flex-col items-center cursor-pointer gap-2 px-1 lg:px-2 text-white"
        >
          <component class="size-5 lg:size-6" :is="routeSingle.iconComponent" />
          <div class="text-xs">{{ routeSingle.routeName }}</div>
        </div>
      </template>
    </div>
    <!--=================== SELECTIONS ====================-->
    <!--================ NOTIFICATION AND USER ==================-->
    <div class="flex flex-col items-center gap-4">
      <div class="cursor-pointer pb- text-white">
        <Bell class="size-5 lg:size-6"></Bell>
      </div>
      <div @click="accountDiaOpen" class="relative cursor-pointer text-white">
        <img
          v-if="userFromStore.loggedInUser.pfp !== ''"
          class="size-7 lg:size-8 rounded-full"
          :src="userFromStore.loggedInUser.pfp"
        />
        <div
          v-else
          class="size-7 lg:size-8 bg-white text text-purple-800 text-center font-bold text-xl rounded-full"
        >
          {{ userFromStore.loggedInUser.name.slice(0, 1).toLocaleUpperCase() }}
        </div>
        <div
          v-if="accountDiaOpenMarker"
          class="size-40 flex flex-col z-30 absolute bottom-0 left-full bg-amber-500 p-2"
        >
          <!----------------- LogOut ----------------->
          <div @click="logOut" class="cursor-pointer items-end text-white">
            <img
              @click.stop
              v-if="userFromStore.loggedInUser.pfp !== ''"
              class="size-14 lg:size-16 rounded-full"
              :src="userFromStore.loggedInUser.pfp"
            />
            <div
              @click.stop
              v-else
              class="size-7 lg:size-8 bg-white text text-purple-800 text-center font-bold text-xl rounded-full"
            >
              {{
                userFromStore.loggedInUser.name.slice(0, 1).toLocaleUpperCase()
              }}
            </div>
            <div
              @click.stop
              class="bg-white text text-purple-800 text-center font-bold text-xl rounded-full"
            >
              {{ userFromStore.loggedInUser.name }}
            </div>
            <LogOut class="size-5 lg:size-6"></LogOut>
          </div>
          <!----------------- LogOut ----------------->
        </div>
      </div>
    </div>
    <!--================ NOTIFICATION AND USER ==================-->
  </div>
</template>
<script setup>
import {
  Bell,
  CheckCheck,
  CircleUser,
  Clock2,
  Folder,
  LayoutDashboard,
  LogOut,
  UserCircle2,
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
const accountDiaOpenMarker = ref(false);
const accountDiaOpen = () => {
  accountDiaOpenMarker.value = !accountDiaOpenMarker.value;
};
const logOut = () => {
  userFromStore.loggedInUser = null;
  router.push("/");
};
</script>
