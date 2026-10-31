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
        <CircleUser v-if="userFromStore.loggedInUser == null" />
        <img
          v-else-if="userFromStore.loggedInUser?.pfp !== ''"
          class="size-7 lg:size-8 rounded-full"
          :src="userFromStore.loggedInUser?.pfp"
        />
        <div
          v-else
          class="size-7 lg:size-8 bg-white text text-purple-800 text-center font-bold text-xl rounded-full"
        >
          {{ userFromStore.loggedInUser?.name.slice(0, 1).toLocaleUpperCase() }}
        </div>
        <Transition name="logoutPanelTransition">
          <div
            ref="logoutPanel"
            v-if="accountDiaOpenMarker && userFromStore.loggedInUser !== null"
            class="flex flex-col w-max text-gray-800 absolute bottom-0 rounded-xl left-full bg-gray-300 p-2"
          >
            <!-- PFP AND NAME ,MAIL -->
            <div class="flex items-center gap-2 px-2 py-1">
              <div v-if="userFromStore.loggedInUser.pfp !== ''">
                <img
                  :src="userFromStore.loggedInUser.pfp"
                  class="size-15 lg:size-18 rounded-full"
                  alt=""
                />
              </div>
              <div
                v-else
                class="size-7 lg:size-8 bg-white text text-purple-800 text-center font-bold text-xl rounded-full"
              >
                {{
                  userFromStore.loggedInUser?.name
                    .slice(0, 1)
                    .toLocaleUpperCase()
                }}
              </div>
              <div class="flex flex-col">
                <div class="text-sm md:text-base lg:text-lg">
                  {{ userFromStore.loggedInUser.name }}
                </div>
                <div class="text-xs md:text-xs lg:text-base">
                  {{ userFromStore.loggedInUser.email }}
                </div>
              </div>
            </div>
            <div
              @click="logOutFun"
              class="flex items-center text-red-700 gap-2 px-2 py-1"
            >
              <logOut class="size-6 lg:size-7"></logOut>
              <div class="font-semibold">LogOut</div>
            </div>
            <!-- PFP AND NAME ,MAIL -->
          </div>
        </Transition>
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
import { ref, Transition, useTemplateRef } from "vue";
import { useUsersStore } from "../Store/UsersStore";
import router from "../router";
import { onClickOutside } from "@vueuse/core";

const userFromStore = useUsersStore();
const logRef = useTemplateRef("logoutPanel");
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
onClickOutside(logRef, () => (accountDiaOpenMarker.value = false));
const logOutFun = () => {
  userFromStore.loggedInUser = null;
  router.push("/");
};
</script>
<style scoped>
.logoutPanelTransition-enter-from,
.logoutPanelTransition-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.logoutPanelTransition-enter-active,
.logoutPanelTransition-leave-active {
  transition: all 0.5s ease;
}
</style>
