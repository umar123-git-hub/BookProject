<template>
  <div>
    <!------- LOGIN PAGE --------->
    <div v-if="loginOk">
      <Login v-model="loginOk"></Login>
    </div>
    <!------- LOGIN PAGE --------->
    <div>
      <nav>
        <Nav></Nav>
      </nav>
      <div class="overflow-hidden h-full">
        <RouterView></RouterView>
      </div>
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

const loginOk = ref(true);
</script>
