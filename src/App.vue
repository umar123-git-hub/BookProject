<template>
  <div class="h-screen w-full">
    <div class="flex gap-0.5">
      <AppNav></AppNav>
      <div class="w-full h-screen">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script setup>
import AppNav from "./components/AppNav.vue";
</script>
