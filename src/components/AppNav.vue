<template>
  <div
    class="sticky top-0 w-max text-white h-screen py-4 bg-purple-900/80 flex flex-col items-center justify-between"
  >
    <!--================ LOGO --================-->
    <div class="flex flex-col justify-center gap-3 items-center px-1.5">
      <div class="p-1 h-max bg-white text-purple-900/80 rounded">
        <CheckCheck class="size-6 border border-white rounded"></CheckCheck>
      </div>
      <div class="text-center font-semibold">Task Flow</div>
    </div>
    <!--================ LOGO --================-->
    <!--=================== SELECTIONS ====================-->
    <div class="flex flex-col gap-5">
      <!----------------- DashBoard ----------------->
      <div class="flex items-center cursor-pointer text-white">
        <LayoutDashboard class="size-6"></LayoutDashboard>
      </div>
      <!----------------- DashBoard ----------------->
      <!----------------- Project ----------------->
      <div class="cursor-pointer text-white">
        <Folder class="size-6"></Folder>
      </div>
      <!----------------- Project ----------------->
      <!----------------- TimeLog ----------------->
      <div class="cursor-pointer text-white">
        <Clock2 class="size-6"></Clock2>
      </div>
      <!----------------- TimeLog ----------------->
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
const logOut = () => {
  userFromStore.loggedInUser = null;
  router.push("/");
};
</script>
