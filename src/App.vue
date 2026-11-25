<template>
  <div class="h-screen overflow-auto w-full relative bg-white flex">
    <AppNav></AppNav>
    <Loader v-if="st.loadMarker"></Loader>
    <div class="w-full h-full pl-16.5 lg:pl-19 ">
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
