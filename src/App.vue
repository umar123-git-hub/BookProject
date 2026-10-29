<template>
  <div class="h-full w-full relative bg-white flex">
    <AppNav></AppNav>
    <div class="w-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import AppNav from "./components/AppNav.vue";
</script>
