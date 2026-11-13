<template>
  <div class="fixed z-50 inset-0 w-full h-screen bg-black/30 backdrop-blur-lg">
    <div
      class="absolute left-1/2 top-1/2 -translate-1/2 flex flex-col gap-3 items-center justify-center"
    >
      <div
        class="rotateClass border-10 p-12 rounded-full border-b-amber-50/0"
      ></div>
      <div class="text-3xl font-semibold">Loading ...</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped>
.rotateClass {
  animation: anim 3s linear infinite;
}
@keyframes anim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
