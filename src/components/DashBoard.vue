<template>
  <div class="relative px-1.5 md:px-2.5 py-1 bg-slate-100 w-full h-full">
    <!--============= CARDS AND TABLE PARENT ==================-->
    <div class="flex flex-col gap-2 md:gap-4">
      <!----------------- WRITTEN AND CARDS -------------------->
      <div>
        <!--------- WRITTEN ------------>
        <div class="flex flex-col gap-0.5">
          <div class="text-xl md:text-2xl font-bold">Good Afternoon, User!</div>
          <div>Here's what's happening with your tasks.</div>
        </div>
        <!--------- WRITTEN ------------>
        <!---------- CARDS ------------->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-1.5 gap-y-1">
          <div class="flex flex-col gap-0.5 border rounded p-2">
            <CircleUser></CircleUser>
            <div class="flex flex-col">
              <div>12</div>
              <div>total</div>
            </div>
          </div>
          <div class="flex flex-col gap-0.5 border rounded p-2">
            <CircleUser></CircleUser>
            <div class="flex flex-col">
              <div>12</div>
              <div>total</div>
            </div>
          </div>
          <div class="flex flex-col gap-0.5 border rounded p-2">
            <CircleUser></CircleUser>
            <div class="flex flex-col">
              <div>12</div>
              <div>total</div>
            </div>
          </div>
          <div class="flex flex-col gap-0.5 border rounded p-2">
            <CircleUser></CircleUser>
            <div class="flex flex-col">
              <div>12</div>
              <div>total</div>
            </div>
          </div>
        </div>
        <!---------- CARDS ------------->
      </div>
      <!----------------- WRITTEN AND CARDS -------------------->
      <!----------------- TABLE AND ADD TASK ------------------->
      <div class="bg-white p-1 rounded px-2">
        <!-- ADD BUTTON AND SELECTS -->
        <div class="flex flex-col">
          <!-- button and written -->
          <div class="flex items-center justify-between py-1">
            <div class="text-base md:text-lg font-bold">My Tasks</div>
            <button class="px-2 py-1 bg-blue-200 rounded">Add Task</button>
          </div>
          <!-- button and written -->
          <!-- selections -->
          <div class="flex gap-1">
            <div class="px-2 py-0.5 text-sm bg-gray-200 rounded-xl">123</div>
            <div class="px-2 py-0.5 text-sm bg-gray-200 rounded-xl">223</div>
            <div class="px-2 py-0.5 text-sm bg-gray-200 rounded-xl">323</div>
            <div class="px-2 py-0.5 text-sm bg-gray-200 rounded-xl">423</div>
          </div>
          <!-- selections -->
        </div>
        <!-- ADD BUTTON AND SELECTS -->
        <!-- TABLE -->
        <TableG :table-arr="exArr"></TableG>
        <!-- TABLE -->
      </div>
      <!----------------- TABLE AND ADD TASK ------------------->
    </div>
    <!--============= CARDS AND TABLE PARENT ==================-->
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
    <div class="flex flex-col">cale</div>
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
  </div>
</template>
<script setup>
import { CircleUser, User } from "@lucide/vue";
import { ref } from "vue";
import TableG from "./TableG.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const exArr = ref([
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
]);
</script>
