<template>
  <div
    class="w-full py-6 px-3 md:px-4 lg:px-5 xl:px-6 border-b border-gray-950 dark:border-gray-100 flex justify-between items-center text-center bg-linear-to-r from-white to-gray-100 dark:from-blue-950 dark:to-gray-900"
  >
    <Menu
      @click="sideBarModel = !sideBarModel"
      class="px-1 py-0.5 size-7 md:size-9 cursor-pointer text-gray-950 dark:text-gray-100 rounded-2xl hover:bg-gray-800/50"
    ></Menu>
    <div class="flex items-center justify-between gap-1 md:gap-2 xl:gap-3">
      <Check
        class="size-7 md:size-11 p-1 md:p-2 bg-linear-to-r dark:from-white dark:to-gray-200 from-blue-700 to-gray-800 rounded-lg bg dark:text-gray-950 text-gray-100 text-base font-semibold"
      >
      </Check>
      <div
        class="text-black dark:text-white md:text-lg lg:text-xl xl:text-2xl font-semibold"
      >
        <div class="hidden sm:flex">Task Management System</div>
        <div class="sm:hidden text-2xl">TMS</div>
      </div>
    </div>
    <ToggleTheme
      class="w-max bg-gray-950 dark:bg-gray-100 px-1 md:px-2 py-0.5 md:py-1.5 hover:bg- rounded-lg cursor-pointer"
    ></ToggleTheme>
    <!--- sideBar ---->
    <SideBar v-if="sideBarModel" v-model="sideBarModel"></SideBar>
    <!--- sideBar ---->
    <!-------- Footer ------->
    <footer
      class="fixed sm:hidden bottom-0 left-0 w-full shadow-2xl border border-t border-gray-300 p-2"
    >
      <Footer></Footer>
    </footer>
    <!-------- Footer ------->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Check, LibraryBig, Menu } from "@lucide/vue";
import SideBar from "./SideBar.vue";
import ToggleTheme from "../components/ThemeToggle.vue";
import Footer from "./Footer.vue";

const sideBarModel = ref(false);
</script>
