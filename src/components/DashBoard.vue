<template>
  <div
    class="relative flex flex-col md:flex-row gap-2 px-3 md:px-5 py-3 pb-25 bg-gray-100 w-full h-full"
  >
    <!--============= CARDS AND TABLE PARENT ==================-->
    <div class="flex flex-col gap-2 md:gap-4">
      <!----------------- WRITTEN AND CARDS -------------------->
      <div>
        <!--------- WRITTEN ------------>
        <div class="flex flex-col gap-0.5">
          <div class="text-xl md:text-2xl font-bold">Good Afternoon, User!</div>
          <div class="font-semibold text-gray-500">
            Here's what's happening with your tasks.
          </div>
        </div>
        <!--------- WRITTEN ------------>
        <!---------- CARDS ------------->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-x-1.5 gap-y-1 cursor-pointer"
        >
          <template
            v-for="card in cardsArr"
            :key="card"
          >
            <div
              :class="card.cardColor"
              class="flex flex-col gap-0.5 rounded p-2"
            >
              <component
                :class="card.iconColor"
                :is="card.iconComp"
              ></component>
              <div class="flex flex-col">
                <div>{{ card.uiNum }}</div>
                <div>{{ card.name }}</div>
              </div>
            </div>
          </template>
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
        <div class="overflow-auto">
          <TableG :table-arr="exArr"></TableG>
        </div>
        <!-- TABLE -->
      </div>
      <!----------------- TABLE AND ADD TASK ------------------->
    </div>
    <!--============= CARDS AND TABLE PARENT ==================-->
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
    <div class="flex flex-col sm:flex-row md:flex-col gap-2">
      <VueDatePicker
        inline
        auto-apply
        class="w-full basis-full"
      />
      <div class="bg-blue-500 basis-full p-32"></div>
    </div>
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
  </div>
</template>
<script setup>
import {
  Check,
  CircleUser,
  FileWarning,
  Loader,
  Summary,
  User,
} from "@lucide/vue";
import { ref } from "vue";
import TableG from "./TableG.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const exArr = ref([
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
  { task: "Design1", category: "UI1", status: "in progress1" },
  { task: "Design2", category: "UI2", status: "in progress2" },
  { task: "Design3", category: "UI3", status: "in progress3" },
]);

const cardsArr = ref([
  {
    name: "Total Tasks",
    iconComp: Summary,
    uiNum: 3,
    cardColor: "bg-blue-100 text-blue-800 ",
    iconColor: "bg-blue-700 text-blue-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "Completed",
    iconComp: Check,
    uiNum: 3,
    cardColor: "bg-green-100 text-green-800 ",
    iconColor: "bg-green-700 text-green-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "In Progress",
    iconComp: Loader,
    uiNum: 3,
    cardColor: "bg-yellow-100 text-yellow-800 ",
    iconColor:
      "bg-yellow-700 text-yellow-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "Overdue",
    iconComp: FileWarning,
    uiNum: 3,
    cardColor: "bg-red-100 text-red-800 ",
    iconColor: "bg-red-700 text-red-200 p-1 rounded-full size-6 md:size-7",
  },
]);
</script>
