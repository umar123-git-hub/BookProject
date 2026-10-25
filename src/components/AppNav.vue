<template>
  <div
    class="sticky h-screen bg-purple-900/80 flex flex-col gap-12 items-center justify-center"
  >
    <!--======================= DashBoard ============================-->
    <div class="px-4 text-white">
      <LayoutDashboard></LayoutDashboard>
    </div>
    <!--======================= DashBoard ============================-->
    <!--======================= Project ============================-->
    <div class="px-4 text-white">
      <Folder></Folder>
    </div>
    <!--======================= Project ============================-->
    <!--======================= TimeLog ============================-->
    <div class="px-4 text-white">
      <Clock2></Clock2>
    </div>
    <!--======================= TimeLog ============================-->
    <!--======================= LogOut ============================-->
    <div class="px-4 text-white absolute bottom-2">
      <LogOut></LogOut>
    </div>
    <!--======================= LogOut ============================-->
  </div>
</template>
<script setup>
import { Clock2, Folder, LayoutDashboard, LogOut } from "@lucide/vue";
import { ref } from "vue";
</script>
