<template>
  <div>
    <!------- LOGIN PAGE --------->
    <div v-if="loginOk">
      <!-- <Login v-model="loginOk"></Login> -->
    </div>
    <!------- LOGIN PAGE --------->
    <div class="flex flex-col w-full">
      <!----------------- SIDE NAV AND ROUTERVIEW PARENT ----------------->
      <div class="flex w-full">
        <!--- sideBar   ---->
        <SideBar class="hidden md:flex"></SideBar>
        <!--- sideBar ---->
        <div class="overflow-hidden w-full flex flex-col h-full">
          <nav class="w-full">
            <Nav></Nav>
          </nav>
          <RouterView></RouterView>
        </div>
      </div>
      <!----------------- SIDE NAV AND ROUTERVIEW PARENT ----------------->

      <!-------- Footer ------->
      <footer
        class="fixed md:hidden bottom-0 left-0 w-full shadow-2xl border border-t border-gray-300 p-2"
      >
        <Footer></Footer>
      </footer>
      <!-------- Footer ------->
    </div>
  </div>
</template>
<script setup>
// import BookParent from "./LMSProject/BookParent.vue";
// import { RouterView } from "vue-router";
import { ref } from "vue";
import Login from "./login.vue";
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
import SideBar from "./SideBar.vue";

const loginOk = ref(true);
</script>
