<template>
  <div class="flex gap-2 w-full justify-between items-center">
    <div
      class="text-center text-blue-500/70 w-full flex items-center justify-center"
    >
      <Home class="size-8"></Home>
    </div>
    <div
      class="text-center text-blue-500/70 w-full flex items-center justify-center"
    >
      <CheckSquare class="size-8"></CheckSquare>
    </div>
    <div
      class="text-center text-blue-500/70 w-full flex items-center justify-center"
    >
      <CalendarCheck class="size-8"></CalendarCheck>
    </div>
    <div
      class="text-center text-blue-500/70 w-full flex items-center justify-center"
    >
      <FolderBookmark class="size-8"></FolderBookmark>
    </div>
    <div
      class="text-center text-blue-500/70 w-full flex items-center justify-center"
    >
      <FolderCheck class="size-8"></FolderCheck>
    </div>
  </div>
</template>
<script setup>
import {
  CalendarCheck,
  CheckSquare,
  FolderBookmark,
  FolderCheck,
  Home,
} from "@lucide/vue";
import { ref } from "vue";
</script>
