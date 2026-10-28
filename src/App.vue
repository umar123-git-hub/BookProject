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
<!-- <template>
  <div class="h-screen w-full flex">
    <AppNav></AppNav>
    <div class="w-full h-screen">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import AppNav from "./components/AppNav.vue";
</script> -->
