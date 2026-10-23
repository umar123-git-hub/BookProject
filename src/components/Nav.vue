<template>
  <div
    class="w-full flex justify-start items-start dark:border-gray-100 text-center bg-linear-to-r from-white to-gray-100 dark:from-blue-950 dark:to-gray-900"
  >
    <!--- sideBar   ---->
    <SideBar class="hidden md:flex"></SideBar>
    <!--- sideBar ---->
    <!-- navBar -->
    <div class="flex items-center bg-green-200 gap-1 h-max">
      <Settings
        class="px-1 py-0.5 size-7 md:size-9 scale-110 cursor-pointer transition-all duration-200 text-gray-950 hover:text-gray-100 hover:rotate-90 rounded-2xl hover:bg-gray-800/50"
      ></Settings>
      <div class="flex items-center gap-1.5">
        <Check
          class="size-7 md:size-11 p-1 md:p-2 bg-blue-600 text-white rounded-lg font-semibold"
        ></Check>
        <h2 class="font-semibold">TaskFlow</h2>
      </div>
    </div>
    <!-- navBar -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Check, LibraryBig, Menu, Settings } from "@lucide/vue";
import SideBar from "./SideBar.vue";
import ToggleTheme from "../components/ThemeToggle.vue";

const sideBarModel = ref(false);
</script>
