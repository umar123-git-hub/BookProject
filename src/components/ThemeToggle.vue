<script setup>
import { Moon, Sun } from "@lucide/vue";
import { toggleTheme } from "../theme.js";
</script>

<template>
  <button type="button" aria-label="Toggle theme" class="" @click="toggleTheme">
    <div class="dark:hidden flex items-center gap-1 md:gap-2 w-max">
      <Moon class="size-4 text-yellow-300 fill-amber-300"></Moon>
      <div class="text-xs md:text-base xl:text-lg text-gray-100">Dark</div>
    </div>
    <div class="hidden dark:flex items-center gap-1 md:gap-2 w-max">
      <Sun class="size-4 text-yellow-600 fill-amber-300"></Sun>
      <div class="text-xs md:text-base xl:text-lg">Light</div>
    </div>
  </button>
</template>
