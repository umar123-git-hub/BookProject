<template>
  <div class="w-full p-1.5 flex justify-between items-center text-center">
    <!-- navBar -->

    <!-- LEFT SIDE -->
    <div class="flex items-center gap-2.5 md:hidden">
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
    <div class="hidden md:flex relative">
      <input
        type="text"
        placeholder="Search, Tasks and Projects"
        class="w-full pl-6 rounded border border-slate-400 bg-slate-50 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
      <Search class="absolute left-0"></Search>
    </div>
    <!-- LEFT SIDE -->
    <!-- RIGHT SIDE -->
    <div class="flex items-center gap-1">
      <Bell
        class="px-1 py-0.5 size-7 md:size-9 scale-110 cursor-pointer transition-all duration-200 text-gray-950 hover:text-gray-100 rounded-2xl hover:bg-gray-800/50"
      ></Bell>
      <UserCircle2></UserCircle2>
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
