<template>
  <div class="h-full w-full relative bg-white flex">
    <AppNav></AppNav>
    <Loader v-if="st.loadMarker"></Loader>
    <div class="w-full pl-20 ">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import AppNav from "./components/AppNav.vue";
import Loader from "./views/loader.vue";
import { useUsersStore } from "./Store/UsersStore.js";
import { watch } from "vue";

const st = useUsersStore();


</script>
