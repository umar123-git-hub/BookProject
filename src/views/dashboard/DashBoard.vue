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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1">
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
              class="flex items-center text-white gap-0.5 shadow-xl transition-all duration-100 bg-mauve-500 hover:bg-mauve-600 cursor-pointer rounded py-1 px-2"
            >
              <StickyNotePlus
                class="size-4 md:size-5 xl:size7"
              ></StickyNotePlus>
              <div class="text-xs md:text-sm font-semibold">Add Task</div>
            </button>
          </div>
          <!-- ADD BTN AND WRITTEN -->
        </div>
        <!--================ ADD BTN AND WRITTEN AND SELECTION BTNS  ========================-->
        <!-- SEARCH AND TABLE -->
        <div class="flex flex-col gap-3">
          <!-- SELECTION BTNS -->
          <OptionsTabs :tabs-arr="selectionsArr">
            <template #tabsDirectionSlot="{ tabsArr }">
              <div class="flex items-center gap-3 w-max">
                <template
                  v-for="tab in tabsArr"
                  :key="tab"
                >
                  <div
                    class="px-2 py-0.5 md:py-1 md:px-2.5 lg:px-3 text-gray-100 bg-mauve-500/85 rounded shadow-lg border border-blue-950/0 font-semibold text-xs hover:scale-110 cursor-pointer transition-all duration-75"
                  >
                    {{ tab.name }}
                  </div>
                </template>
              </div>
            </template>
          </OptionsTabs>
          <!-- SELECTION BTNS -->

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
            <TableG
              v-if="tasksArr.length !== 0"
              :table-arr="tasksArr"
              :table-design="tableDesign"
            >
              <template #simple="{ simpleData }">
                <div class="px-2 flex justify-center items-center">
                  {{ simpleData }}
                </div>
              </template>
              <template #simpleArraySlot="{ tdData }">
                <div
                  class="flex flex-wrap gap-1 items-center py-1 line-clamp-2"
                >
                  <template
                    v-for="t in tdData"
                    :key="t.id"
                  >
                    <div
                      class="px-2 py-1 relative group text-xs text-white bg-mauve-500 rounded-full"
                    >
                      {{ t }}
                    </div>
                  </template>
                </div>
              </template>
              <template #arrayOfObjectSlot="{ tdData }">
                <div class="flex gap-1 justify-center items-center py-1">
                  <template
                    v-for="t in tdData"
                    :key="t.id"
                  >
                    <div
                      class="px-2 py-1 relative group text-xs text-white bg-mauve-500 rounded-full"
                    >
                      {{
                        t.name
                          .split(" ")
                          .map((s) => s.slice(0, 1).toLocaleUpperCase())
                          .join("")
                      }}
                    </div>
                  </template>
                </div>
              </template>
              <template #DateSlot="{ tdData }">
                <div class="flex justify-center items-center">
                  {{ format(tdData, "dd MMM yyyy") }}
                </div>
              </template>
              <template #objectSlot="{ tdData }">
                <div class="flex gap-2">
                  <template
                    v-for="(time, tKey) in tdData"
                    :key="time"
                  >
                    <div class="flex gap-1">
                      <div class="col-span-1">{{ time }}</div>
                      <div class="col-span-4">
                        {{ tKey == "h" ? "Hour" : "Min" }}
                      </div>
                    </div>
                  </template>
                </div>
              </template>

              <!-- EXTRAS TCOL HANDLING -->
              <template #extraCol>
                <col :style="{ width: 200 + 'px' }" />
              </template>
              <template #extraTh>
                <th>Actions</th>
              </template>
              <template #extraTd="{ tableRow }">
                <td class="">
                  <div class="flex items-center justify-center gap-5">
                    <template
                      v-for="action in actionsArr"
                      :key="action"
                    >
                      <component
                        @click="
                          action.name == 'delete' ? deleteFun(tableRow) : ''
                        "
                        class="cursor-pointer"
                        :is="action.iconComp"
                      />
                    </template>
                  </div>
                </td>
              </template>
              <!-- EXTRAS TCOL HANDLING -->
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
      @refresh="refreshFun()"
      @hide="addEditMarker = false"
    ></AddEditTask>
    <!-- DIALOGUE -->
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent, onMounted, computed } from "vue";
import {
  Summary,
  Check,
  Loader,
  StickyNotePlus,
  Search,
  ListTodo,
  Trash,
  Edit,
} from "@lucide/vue";
import { useUsersStore } from "../../Store/UsersStore";
import { useTaskStore } from "../../Store/TasksStore.js";
import { getAllTasks, deleteTask } from "../../services/TaskService.js";
import { format } from "date-fns";
import OptionsTabs from "../../components/utils/OptionsTabs/OptionsTabs.vue";
const AddEditTask = defineAsyncComponent(
  () => import("../../components/utils/addEditTask.vue"),
);
const TableG = defineAsyncComponent(
  () => import("../../components/utils/TableG.vue"),
);
const userFromStore = useUsersStore();

const addEditMarker = ref(false);
const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const tasksArr = ref([]);

const tableDesign = ref([
  { header: "Title", field: "title", wid: "300px", simple: true },
  {
    header: "Assignees",
    field: "assignees",
    wid: "150px ",
    arrayOfObjectSlot: true,
  },
  { header: "Stage", field: "stage", wid: "70px" },
  { header: "Priority", field: "priority", wid: "70px", simple: true },
  { header: "Tags", field: "tags", wid: "200px", simpleArraySlot: true },
  { header: "Start Date", field: "startDate", wid: "200px", DateSlot: true },
  { header: "End Date", field: "endDate", wid: "200px", DateSlot: true },
  {
    header: "Estimated Time",
    field: "estimatedTime",
    wid: "100px",
    objectSlot: true,
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
    name: "To Do",
    iconComp: ListTodo,
    uiNum: 3,
    cardColor:
      "bg-red-100 text-red-700 border-red-200/70  shadow hover:shadow-lg ",
    iconColor: "bg-red-500 text-white p-1 rounded-full size-7 md:size-8",
  },
  {
    name: "In Progress",
    iconComp: Loader,
    uiNum: 3,
    cardColor:
      "bg-amber-50 text-yellow-700 border-amber-100  shadow hover:shadow-lg ",
    iconColor: "bg-amber-500 text-white p-1 rounded-full size-7 md:size-8",
  },
  {
    name: "Completed",
    iconComp: Check,
    uiNum: 3,
    cardColor:
      "bg-green-50 text-green-800 border-green-100 shadow hover:shadow-lg ",
    iconColor: "bg-green-500 text-green-100 p-1 rounded-full size-7 md:size-8",
  },
  // {
  //   name: "Overdue",
  //   iconComp: FileWarning,
  //   uiNum: 3,
  //   cardColor: "bg-red-100 text-red-800 ",
  //   iconColor: "bg-red-600 text-red-50 p-1 rounded-full size-6 md:size-7",
  // },
]);
const selectionsArr = ref([
  { name: "All" },
  { name: "To Do" },
  { name: "In Progress" },
  { name: "Completed" },
]);
const actionsArr = ref([
  { name: "edit", iconComp: Edit },
  { name: "delete", iconComp: Trash },
]);
const refreshComp = computed(() => userFromStore.refreshMarker);
const deleteFun = (toBeDelete) => {
  deleteTask(toBeDelete.id);
};
const refreshFun = () => {
  console.log("userFromStore.loggedInUser.id", userFromStore.loggedInUser.id);
  getAllTasks().then((res) => {
    console.log("res", res);
    tasksArr.value = res.filter((f) =>
      f.assignees.some((s) => s.id == userFromStore.loggedInUser.id),
    );
    console.log("tasksArr.value", tasksArr.value);
  });
  addEditMarker.value = false;
};
onMounted(() => {
  refreshFun();
});
</script>
