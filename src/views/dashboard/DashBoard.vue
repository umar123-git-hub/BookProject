<template>
  <div class="relative w-full grid grid-cols-1 md:grid-cols-12">
    <!--=================== LEFT SIDE =================-->
    <div class="p-3 w-full flex flex-col gap-3 md:col-span-8 lg:col-span-9">
      <!-- CARD AND WRITTEN -->
      <div class="flex flex-col gap-4">
        <!-- written -->
        <div class="flex flex-col">
          <div class="font-semibold xl:font-bold text-xl xl:text-2xl">
            Good Afternoon, {{ userFromStore.loggedInUser?.name }} !
          </div>
          <div>Here's what's happening with your tasks today.</div>
        </div>
        <!-- written -->
        <!-- cards -->
        <div class="grid grid-cols-3 gap-x-2 gap-y-1">
          <template
            v-for="card in cardsArr"
            :key="card"
          >
            <div
              :class="card.cardColor"
              class="flex flex-col cursor-pointer gap-1 transition-all duration-150 p-3 border rounded-xl"
            >
              <component
                :is="card.iconComp"
                :class="card.iconColor"
              />
              <div class="flex flex-col">
                <div class="text-lg font-semibold md:text-xl xl:font-bold">
                  {{ card.uiNum }}
                </div>
                <div class="text-xs lg:text-lg">
                  {{ card.name }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- cards -->
      </div>
      <!--CARD AND WRITTEN -->
      <!-- ADD, SELECTION AND TABLE  -->
      <div class="flex flex-col gap-1 bg-blue-500/10 rounded-xl px-3">
        <!--================ ADD BTN AND WRITTEN AND SELECTION BTNS  ========================-->
        <div class="flex flex-col py-3 gap-1">
          <!-- ADD BTN AND WRITTEN -->
          <div class="flex items-center justify-between">
            <div
              class="px-1 py-0.5 font-semibold lg:font- text-base md:text-lg xl:text-xl"
            >
              My Tasks
            </div>
            <button
              @click="addEditMarker = !addEditMarker"
              class="flex items-center text-white gap-0.5 shadow-xl transition-all duration-100 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded p-1"
            >
              <StickyNotePlus
                class="size-4 md:size-5 xl:size7"
              ></StickyNotePlus>
              <div class="text-xs md:text-sm">Add Task</div>
            </button>
          </div>
          <!-- ADD BTN AND WRITTEN -->
          <!-- SELECTION BTNS -->
          <div class="flex items-center gap-1 sm:gap-2 lg:gap-4 py-1">
            <template
              v-for="select in selections"
              :key="select.name"
            >
              <div
                class="p-1 sm:py-1 border border-blue-400 rounded text-xs md:text-sm bg-blue-100 hover:bg-blue-200 cursor-pointer transition-all duration-100 text-blue-700"
              >
                {{ select.name }}
              </div>
            </template>
          </div>
          <!-- SELECTION BTNS -->
        </div>
        <!--================ ADD BTN AND WRITTEN AND SELECTION BTNS  ========================-->
        <!-- SEARCH AND TABLE -->
        <div class="flex flex-col gap-3">
          <!-- search -->
          <div
            class="flex items-center backdrop-blur-2xl bg-white shadow-xl rounded-xl gap-2 px-3 py-2 border border-white w-full"
          >
            <Search class="size-5 stroke-3 text-gray-600"></Search>
            <input
              type="text"
              class="w-full bg-transparent py-0.5 outline-none"
              placeholder="Search Tasks"
            />
          </div>
          <!-- search -->
          <!-- TABLE -->
          <div class="w-full overflow-auto bg-white h-3/4 rounded-xl">
            <TableG :table-arr="tasksArr">
              <template #tableHeadingSlot="{ tableKeys }">
                <tr class="rounded bg-blue-400">
                  <template
                    v-for="tableHeading in tableKeys"
                    :key="tableHeading"
                  >
                    <th
                      v-if="tableHeading !== 'id'"
                      class="text-white text-base lg:text-lg bg-blue-400 sticky top-0"
                    >
                      {{ formatLabel(tableHeading) }}
                    </th>
                  </template>
                </tr>
              </template>
              <template #tableRowSlot="{ tableRow }">
                <tr
                  class="text-center z-20 text-sm md:text-base xl:text-lg hover:bg-blue-200"
                >
                  <template
                    v-for="(tableData, key) in tableRow"
                    :key="tableData.id"
                  >
                    <td
                      v-if="key !== 'id'"
                      class="px-4 py-1.5"
                    >
                      {{ tableData }}
                    </td>
                  </template>
                </tr>
              </template>
            </TableG>
          </div>
          <!-- TABLE -->
        </div>

        <!-- SEARCH AND TABLE -->
      </div>
      <!-- ADD, SELECTION AND TABLE  -->
    </div>
    <!--=================== LEFT SIDE =================-->
    <!--=================== RIGHT SIDE =================-->
    <div class="p-3 w-full bg-blue-200 md:col-span-4 lg:col-span-3">right</div>
    <!--=================== RIGHT SIDE =================-->
    <!-- DIALOGUE -->
    <AddEditTask
      v-if="addEditMarker"
      @hide="addEditMarker = false"
    ></AddEditTask>
    <!-- DIALOGUE -->
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import {
  Summary,
  Check,
  Loader,
  FileWarning,
  StickyNotePlus,
  Search,
} from "@lucide/vue";
import { useUsersStore } from "../../Store/UsersStore";
import TableG from "../../components/utils/TableG.vue";
const AddEditTask = defineAsyncComponent(
  () => import("../../components/utils/addEditTask.vue"),
);
const userFromStore = useUsersStore();
const addEditMarker = ref(false);
const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const tasksArr = ref([
  {
    id: crypto.randomUUID(),
    title: "Design login page UI",
    category: "UI/UX",
    date: "Today, 5:00 PM",
    status: "In Progress",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Set up project repository",
    category: "Development",
    date: "Today, 10:00 AM",
    status: "Completed",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Write API documentation",
    category: "Backend",
    date: "Tomorrow, 11:00 AM",
    status: "To Do",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Prepare presentation",
    category: "Work",
    date: "May 18, 2025",
    status: "To Do",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Fix responsive issues",
    category: "Frontend",
    date: "May 14, 2025",
    status: "Completed",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Plan next sprint",
    category: "Planning",
    date: "May 20, 2025",
    status: "To Do",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Update dependencies",
    category: "Maintenance",
    date: "May 22, 2025",
    status: "In Progress",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Review pull requests",
    category: "Development",
    date: "May 23, 2025",
    status: "To Do",
    completed: false,
  },
]);

const cardsArr = ref([
  {
    name: "Total Tasks",
    iconComp: Summary,
    uiNum: 3,
    cardColor:
      "bg-blue-50 text-blue-800 border-blue-100 shadow hover:shadow-lg ",
    iconColor: "bg-blue-500 text-blue-100 p-1 rounded-full size-7 md:size-8",
  },
  {
    name: "Completed",
    iconComp: Check,
    uiNum: 3,
    cardColor:
      "bg-green-50 text-green-800 border-green-100 shadow hover:shadow-lg ",
    iconColor: "bg-green-500 text-green-100 p-1 rounded-full size-7 md:size-8",
  },
  {
    name: "In Progress",
    iconComp: Loader,
    uiNum: 3,
    cardColor:
      "bg-amber-50 text-yellow-800 border-amber-100  shadow hover:shadow-lg ",
    iconColor: "bg-amber-500 text-white p-1 rounded-full size-7 md:size-8",
  },
  // {
  //   name: "Overdue",
  //   iconComp: FileWarning,
  //   uiNum: 3,
  //   cardColor: "bg-red-100 text-red-800 ",
  //   iconColor: "bg-red-600 text-red-50 p-1 rounded-full size-6 md:size-7",
  // },
]);

const selections = ref([
  { name: "All" },
  { name: "To Do" },
  { name: "In Progress" },
  { name: "Completed" },
]);
</script>
