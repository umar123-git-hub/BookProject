<template>
  <div
    class="w-full flex justify-start items-start dark:border-gray-100 text-center bg-linear-to-r from-white to-gray-100 dark:from-blue-950 dark:to-gray-900"
  >
    <!-- navBar -->
    <div class="flex justify-between items-center w-full bg-green-200 gap-1">
      <!-- LEFT SIDE -->
      <div class="flex items-center gap-1.5">
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
      <!-- LEFT SIDE -->
      <!-- RIGHT SIDE -->
      <div>s</div>
      <!-- RIGHT SIDE -->
    </div>
    <!-- navBar -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Check, LibraryBig, Menu, Settings } from "@lucide/vue";
import ToggleTheme from "../components/ThemeToggle.vue";

const sideBarModel = ref(false);
</script>
