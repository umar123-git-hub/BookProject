<template>
  <!-- Main Overlay black -->
  <div
    class="flex items-center justify-center w-full h-full bg-slate-200 px-4 py-8"
  >
    <!-- Dialog Box -->
    <div class="flex flex-col rounded-3xl bg-white shadow-2xl px-6 py-4">
      <!-- Top Decorative Section -->

      <!-- Header -->
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold text-slate-800">Welcome Back!</h2>

        <p class="mt-2 text-sm text-slate-500">
          Please enter your details to sign in.
        </p>
      </div>
      <!-- Header -->

      <!-- Login Form Layout -->
      <div class="space-y-5">
        <!-------------------- Email  ------------------------------------------------------------>
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            User Name
            <input
              v-model="userNameModel"
              type="text"
              placeholder="name@gmail.com"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </label>
        </div>
        <!-------------------- Email ------------------------------------------------------------>

        <!-- Password Field -->
        <div>
          <label class="text-sm font-semibold text-slate-700">
            <div class="">Password</div>
            <input
              v-model="passwordModel"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </label>
        </div>

        <button
          class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          Forgot Password?
        </button>
        <!-- Remember Me -->
        <div class="flex items-center">
          <label class="cursor-pointer flex gap-2 items-center text-slate-600">
            <input
              type="checkbox"
              class="cursor-pointer rounded accent-indigo-600"
            />

            <div class="text-sm">Remember me</div>
          </label>
        </div>
        <!--------- Remember Me -------------------------->

        <!-- Login Button -->
        <button
          @click="loginFun"
          class="w-full rounded-xl bg-indigo-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition cursor-pointer hover:bg-indigo-700 active:scale-[0.98]"
        >
          Login to Account
        </button>
        <!-- Login Button -->
      </div>
      <!-- Login Form Layout -->

      <!-- Register Section -->
      <div class="mt-7 text-center">
        <p class="text-sm text-slate-500">
          Don't have an account?

          <button
            class="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Register Now
          </button>
        </p>
      </div>
      <!-- Register Section -->
    </div>
  </div>
  <!-- Main Overlay black -->
</template>
<script setup>
import { ref } from "vue";
import { useUsersStore } from "../Store/UsersStore";
import { useRouter } from "vue-router";
import router from "../router";
import DashBoard from "./dashboard/DashBoard.vue";
const usersFromStore = useUsersStore();

const loginOk = defineModel({
  type: Boolean,
});

const userNameModel = ref("");
const passwordModel = ref("");

const loginFun = () => {
  let required = usersFromStore.allUser.find(
    (i) => i.userName === userNameModel.value.trim().toLocaleLowerCase(),
  );
  if (required) {
    if (required.password === passwordModel.value) {
      usersFromStore.loggedInUser = required;
      router.push({ name: "DashBoard" });
    }
  }

  // if user is deleted then its username must be stored permanently
  // let required = usersFromStore.allUser.filter(
  //   (i) => i.userName === userNameModel.value.trim().toLocaleLowerCase(),
  // );
  // if (required.length == 0) return;
  // if (required.filter((i) => i.password === passwordModel.value)) {
  //   router.push("/dashboard");

  // } else {
  //   return console.log("!");
  // }
};
</script>
