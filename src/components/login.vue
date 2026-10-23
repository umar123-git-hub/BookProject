<template>
  <!-------------------------- MAiN Div ---------------------------->
  <div
    class="relative w-full h-screen bg-linear-to-r from-blue-300 to-blue-200"
  >
    <!----------- DIALOG DIV ------------>
    <div
      class="absolute top-1/2 left-1/2 -translate-1/2 p-4 shadow-2xl border border-blue-400 rounded-2xl flex flex-col gap-4 justify-center items-center"
    >
      <!------- USER logo ---------->
      <div
        class="text-blue-600 rounded-full border border-blue-500 flex items-center justify-center p-6 w-max"
      >
        <user-round></user-round>
      </div>
      <!------- USER logo ---------->
      <!------- USER NAME ---------->
      <div>
        <label class="flex flex-col text-blue-600">
          User Name
          <input
            type="text"
            class="outline-none px-4 py-2 border border-blue-500 rounded shadow-2xl"
            placeholder="Name ..."
          />
        </label>
      </div>
      <!------- USER NAME ---------->
      <!------- USER PASSWORD ---------->
      <div>
        <label class="flex flex-col text-blue-600">
          User Password
          <input
            type="text"
            class="outline-none px-4 py-2 border border-blue-500 rounded shadow-2xl"
            placeholder="Password ..."
          />
        </label>
      </div>
      <!------- USER PASSWORD ---------->
      <!------- LOGIN BUTTON ---------->
      <div class="flex w-full justify-end">
        <button
          @click="loginOk = !loginOk"
          class="shadow-2xl border border-blue-500 px-2 py-1 rounded text-blue-600"
        >
          Login
        </button>
      </div>
      <!------- LOGIN BUTTON ---------->
    </div>
    <!----------- DIALOG DIV ------------>
  </div>
  <!-------------------------- MAiN Div ---------------------------->
</template>
<script setup>
import { UserRound } from "@lucide/vue";
import { ref } from "vue";

const loginOk = defineModel({ type: Boolean });
</script>
