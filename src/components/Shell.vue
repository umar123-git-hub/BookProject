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
    </div>
  </div>
</template>
<script setup>
// import BookParent from "./LMSProject/BookParent.vue";
// import { RouterView } from "vue-router";
import { ref } from "vue";
import Login from "./login.vue";
import Nav from "./Nav.vue";

const loginOk = ref(true);
</script>
