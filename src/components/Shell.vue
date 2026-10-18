<template>
  <div
    class="relative overflow-clip h-screen bg-white dark:bg-gray-90 transition-colors ease-in-out duration-200"
  >
    <nav>
      <Nav></Nav>
    </nav>
    <div class="overflow-hidden h-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import BookParent from "./LMSProject/BookParent.vue";
import { RouterView } from "vue-router";
import Nav from "./Nav.vue";
</script>
