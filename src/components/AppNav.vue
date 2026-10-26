<template>
  <div
    class="sticky top-0 w-max text-white h-screen py-2 bg-purple-900/80 flex flex-col items-center justify-between"
  >
    <!--================ LOGO --================-->
    <div class="flex items-center px-2">
      <div class="p-1 h-max bg-white text-purple-900/80 rounded">
        <Check class="size-6 border border-white rounded"></Check>
      </div>
      <div class="hidden">TaskFlow</div>
    </div>
    <!--================ LOGO --================-->
    <!--=================== SELECTIONS ====================-->
    <div class="flex flex-col gap-5">
      <!----------------- DashBoard ----------------->
      <div class="flex items-center cursor-pointer text-white">
        <LayoutDashboard></LayoutDashboard>
      </div>
      <!----------------- DashBoard ----------------->
      <!----------------- Project ----------------->
      <div class="cursor-pointer text-white">
        <Folder></Folder>
      </div>
      <!----------------- Project ----------------->
      <!----------------- TimeLog ----------------->
      <div class="cursor-pointer text-white">
        <Clock2></Clock2>
      </div>
      <!----------------- TimeLog ----------------->
    </div>
    <!--=================== SELECTIONS ====================-->
    <!----------------- LogOut ----------------->
    <div class="cursor-pointer text-white">
      <LogOut></LogOut>
    </div>
    <!----------------- LogOut ----------------->
  </div>
</template>
<script setup>
import { Check, Clock2, Folder, LayoutDashboard, LogOut } from "@lucide/vue";
import { ref } from "vue";
</script>
