<template>
  <!-- Main Overlay black -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
  >
    <!-- Dialog Box -->
    <div
      class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <!-- Top Decorative Section -->

      <div class="p-7">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h2
            id="login-title"
            class="text-3xl font-bold tracking-tight text-slate-800"
          >
            Welcome Back!
          </h2>

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
              Email Address
              <input
                type="email"
                placeholder="name@gmail.com"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>
          <!-------------------- Email ------------------------------------------------------------>

          <!-- Password Field -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label class="text-sm font-semibold text-slate-700">
                Password
                <button
                  class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </label>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <!-- Remember Me -->
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              class="h-4 w-4 cursor-pointer rounded accent-indigo-600"
            />

            <label class="cursor-pointer text-sm text-slate-600">
              Remember me
            </label>
          </div>
          <!--------- Remember Me -------------------------->

          <!-- Login Button -->
          <button
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
  </div>
  <!-- Main Overlay black -->
</template>
<script setup>
import { X } from "@lucide/vue";
import { ref } from "vue";
</script>
