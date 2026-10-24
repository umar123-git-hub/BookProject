<template>
  <div
    class="relative h-full flex flex-col md:flex-row gap-2 px-3 md:px-5 py-3 pb-25 w-full"
  >
    <!--============= CARDS AND TABLE PARENT ==================-->
    <div class="flex flex-col gap-2 md:gap-4">
      <!----------------- WRITTEN AND CARDS -------------------->
      <div class="flex flex-col gap-2 md:gap-4">
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
      <div class="bg-white p-1 rounded px-2 flex flex-col gap-2">
        <!-- ADD BUTTON AND SELECTS -->
        <div class="flex flex-col">
          <!-- button and written -->
          <div class="flex items-center justify-between py-1">
            <div class="text-base md:text-lg font-bold">My Tasks</div>
            <button
              class="px-2 py-1 hover:text-blue-500 cursor-pointer transition-all duration-150 rounded"
            >
              <CirclePlus></CirclePlus>
            </button>
          </div>
          <!-- button and written -->
          <!-- selections -->
          <div class="flex gap-1">
            <template v-for="itemFilter in filtersForTable">
              <div
                class="px-2 py-0.5 text-xs md:text-sm cursor-pointer bg-blue-100 text-blue-800 rounded-xl"
              >
                {{ itemFilter.name }}
              </div>
            </template>
          </div>
          <!-- selections -->
        </div>
        <!-- ADD BUTTON AND SELECTS -->
        <!-- TABLE -->
        <div class="overflow-auto h-1/3">
          <TableG :table-arr="tasksArr">
            <template #tableHeadingSlot="{ tableKeys }">
              <tr class="bg-blue-500 text-white sticky top-0">
                <template
                  v-for="tableHeading in tableKeys"
                  :key="tableHeading"
                >
                  <th
                    class="py-1"
                    v-if="tableHeading !== 'id'"
                  >
                    {{ formatLabel(tableHeading) }}
                  </th>
                </template>
              </tr>
            </template>
            <template #tableRowSlot="{ tableRow }">
              <tr
                class="hover:bg-blue-300 even:bg-blue-100 transition-all duration-100"
              >
                <template v-for="(TableData, key) in tableRow">
                  <td
                    v-if="key !== 'id'"
                    class="px-2 py-2"
                  >
                    {{ TableData }}
                  </td>
                </template>
              </tr>
            </template>
          </TableG>
        </div>
        <!-- TABLE -->
      </div>
      <!----------------- TABLE AND ADD TASK ------------------->
    </div>
    <!--============= CARDS AND TABLE PARENT ==================-->
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
    <div class="flex flex-col items-start sm:flex-row md:flex-col gap-2">
      <VueDatePicker
        inline
        auto-apply
        class="w-full basis-full"
      />
      <div class="bg-blue-500 p-32"></div>
    </div>
    <!--============= DATES AND PROGRESS GRAPH PARENT ==================-->
  </div>
</template>
<script setup>
import {
  Check,
  CirclePlus,
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

const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};
const tasksArr = ref([
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Design login page UI",
    category: "UI/UX",
    dueDate: "Today, 5:00 PM",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Set up project repository",
    category: "Development",
    dueDate: "Today, 10:00 AM",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Write API documentation",
    category: "Backend",
    dueDate: "Tomorrow, 11:00 AM",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Prepare presentation",
    category: "Work",
    dueDate: "May 18, 2025",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Fix responsive issues",
    category: "Frontend",
    dueDate: "May 16, 2025",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    task: "Plan next sprint",
    category: "Planning",
    dueDate: "May 20, 2025",
    status: "To Do",
  },
  {
    id: crypto.randomUUID(),
    task: "Update dependencies",
    category: "Maintenance",
    dueDate: "May 22, 2025",
    status: "In Progress",
  },
  {
    id: crypto.randomUUID(),
    task: "Review pull requests",
    category: "Development",
    dueDate: "May 23, 2025",
    status: "To Do",
  },
]);

const cardsArr = ref([
  {
    name: "Total Tasks",
    iconComp: Summary,
    uiNum: 3,
    cardColor: "bg-blue-100 text-blue-800 ",
    iconColor: "bg-blue-600 text-blue-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "Completed",
    iconComp: Check,
    uiNum: 3,
    cardColor: "bg-green-100 text-green-800 ",
    iconColor: "bg-green-600 text-green-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "In Progress",
    iconComp: Loader,
    uiNum: 3,
    cardColor: "bg-yellow-100 text-yellow-800 ",
    iconColor:
      "bg-yellow-600 text-yellow-200 p-1 rounded-full size-6 md:size-7",
  },
  {
    name: "Overdue",
    iconComp: FileWarning,
    uiNum: 3,
    cardColor: "bg-red-100 text-red-800 ",
    iconColor: "bg-red-600 text-red-50 p-1 rounded-full size-6 md:size-7",
  },
]);

const filtersForTable = ref([
  { name: "All" },
  { name: "To Do" },
  { name: "In Progress" },
  { name: "Completed" },
]);
</script>
