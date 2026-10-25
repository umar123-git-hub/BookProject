<template>
  <div
    class="w-full p-1.5 md:px-2.5 bg-white flex justify-between items-center"
  >
    <!-- navBar -->

    <!-- LEFT SIDE -->
    <div class="flex flex-1 items-center gap-2.5 md:hidden">
      <Settings
        class="px-1 py-0.5 size-7 md:size-9 scale-110 cursor-pointer transition-all duration-200 text-gray-950 hover:text-gray-100 hover:rotate-90 rounded-2xl hover:bg-gray-800/50"
      ></Settings>
      <!-- WRITTEN AND LOGO -->
      <div class="flex items-center gap-1.5">
        <Check
          class="size-7 md:size-11 p-1 md:p-2 bg-blue-600 text-white rounded-lg font-semibold"
        ></Check>
        <h2 class="font-semibold">TaskFlow</h2>
      </div>
      <!-- WRITTEN AND LOGO -->
    </div>
    <div class="hidden flex-1 md:flex relative">
      <input
        type="text"
        placeholder="Search, Tasks and Projects"
        class="basis-full pl-6 pr-1 py-2 rounded text-sm bg-slate-200 text-slate-800 outline-none transition placeholder:text-slate-500 placeholder:font-semibold ring ring-amber-50/0 focus:ring-blue-400 focus:shadow-sm focus:shadow-blue-400 focus:bg-white"
      />
      <Search class="absolute left-1 top-2.5 size-4 text-gray-600"></Search>
    </div>
    <!-- LEFT SIDE -->
    <!-- RIGHT SIDE -->
    <div class="flex justify-end flex-1 items-center gap-2 md:gap-4">
      <Bell
        class="size-4 scale-105 md:size-5 cursor-pointer transition-all duration-200 text-gray-950 hover:text-blue-400 rounded-2xl"
      ></Bell>
      <div class="flex items-center gap-1">
        <UserCircle2 class="size-7 md:size-9 lg:size-10"></UserCircle2>
        <div class="hidden md:block text-xs">User name</div>
      </div>
    </div>
    <!-- RIGHT SIDE -->

    <!-- navBar -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  Bell,
  Check,
  LibraryBig,
  Menu,
  Search,
  Settings,
  UserCircle2,
} from "@lucide/vue";
import ToggleTheme from "../components/ThemeToggle.vue";

const sideBarModel = ref(false);
</script>
