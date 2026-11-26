<template>
  <div class="relative w-full flex bg-gray-200">
    <!--=================== LEFT SIDE =================-->
    <div class="py-3 px-1 w-full flex flex-col gap-3">
      <!-- CARD AND WRITTEN -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between px-3">
          <!-- written -->
          <div class="flex flex-col">
            <div class="font-semibold xl:font-bold text-xl xl:text-2xl">
              Good Afternoon, {{ userFromStore.loggedInUser?.name }} !
            </div>
            <div>Here's what's happening with your tasks today.</div>
          </div>
          <!-- written -->
          <!-- ADD BTN AND WRITTEN -->
          <button
            @click="openAdd"
            class="flex text-white gap-0.5 shadow-xl h-max transition-all duration-100 bg-mauve-500 hover:bg-mauve-600 cursor-pointer rounded py-1 px-2"
          >
            <StickyNotePlus class="size-4 md:size-5 xl:size7"></StickyNotePlus>
            <div class="text-xs md:text-sm font-semibold">Add Task</div>
          </button>
          <!-- ADD BTN AND WRITTEN -->
        </div>
        <!--================  CARDS AND CHARTS ========================-->
        <div
          class="flex flex-col gap-3 lg:flex-row bg-white px-2 py-1 rounded shadow shadow-gray-400"
        >
          <!-- cards -->
          <div
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-x-2 gap-y-1 w-full lg:w-[60%]"
          >
            <template v-for="card in cardsArr" :key="card">
              <div
                @click="tableSelectModel = card.name"
                :class="card.cardColor"
                class="flex flex-col cursor-pointer gap-1 transition-all duration-150 p-3 border rounded-xl"
              >
                <component :is="card.iconComp" :class="card.iconColor" />
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
          <!-- Chart -->
          <div
            class="w-full lg:w-[40%] h-60 shadow shadow-gray-800 border border-gray-400 rounded"
          >
            <PieChart :dataset="chartDataset"></PieChart>
          </div>
          <!-- Chart -->
        </div>
        <!--================  CARDS AND CHARTS ========================-->
      </div>
      <!--CARD AND WRITTEN -->
      <!-- ADD, SELECTION AND TABLE  -->
      <div class="flex flex-col gap-1 bg-blue-500/10 rounded-xl px-3">
        <!--================ ADD BTN AND WRITTEN AND SELECTION BTNS  ========================-->
        <div class="flex flex-col py-3 gap-1"></div>
        <!--================ ADD BTN AND WRITTEN AND SELECTION BTNS  ========================-->
        <!-- SEARCH AND TABLE -->
        <div class="flex flex-col gap-3">
          <!-- TABLE -->
          <div class="w-full bg-white h-full rounded-xl">
            <TableG
              v-if="tasksArr.length !== 0"
              :table-arr="tasksComputed"
              :table-design="tableDesign"
              @search-refresh="searchRefresh"
            >
              <template #simple="{ simpleData }">
                <div class="px-2 flex justify-center items-center">
                  {{ simpleData }}
                </div>
              </template>
              <template #simpleArraySlot="{ tdData }">
                <div
                  class="flex flex-wrap gap-1 items-center justify-center py-1 line-clamp-2"
                >
                  <template v-for="t in tdData" :key="t.id">
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
                  <template v-for="t in tdData" :key="t.id">
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
                  {{ tdData == null ? "--" : format(tdData, "dd MMM yyyy") }}
                </div>
              </template>
              <template #objectSlot="{ tdData }">
                <div class="flex gap-2">
                  <template v-for="(time, tKey) in tdData" :key="time">
                    <div class="flex items-center gap-1">
                      <div class="text-sm">
                        {{ time == 0 ? "--" : time }}
                      </div>
                      <div class="text-sm">
                        {{ tKey == "h" ? " Hour" : "Min" }}
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
                    <template v-for="action in actionsArr" :key="action">
                      <component
                        @click="
                          action.name == 'delete'
                            ? deleteFun(tableRow, action.name)
                            : editOpen(tableRow, action.name)
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
    <!-- DIALOGUE -->
    <AddEditTask
      v-if="addEditMarker"
      @refresh="refreshFun()"
      @hide="closeDia"
      :edit-delete-obj="editDeleteObj"
      :dia-type="diaType"
    ></AddEditTask>
    <!-- DIALOGUE -->
  </div>
</template>
<script setup>
//--------------------- imports

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
import { useUsersStore } from "@/Store/UsersStore";
import { getAllTasks, deleteTask } from "@/services/TaskService.js";
import { format } from "date-fns";
import PieChart from "@/components/utils/PieChart/PieChart.vue";
import { searchTasks } from "@/services/TaskService";

const AddEditTask = defineAsyncComponent(
  () => import("../../components/utils/AddEdit/addEditTask.vue"),
);
const TableG = defineAsyncComponent(
  () => import("../../components/utils/TableG.vue"),
);
//--------------------- imports
const userFromStore = useUsersStore();

// DIALOGUE OPEN AND CLOSE WORK
const addEditMarker = ref(false);
const editDeleteObj = ref(null);
const diaType = ref("");

const openAdd = () => {
  addEditMarker.value = !addEditMarker.value;
};
const closeDia = () => {
  addEditMarker.value = false;
  editDeleteObj.value = null;
  diaType.value = "";
};
// DIALOGUE OPEN AND CLOSE WORK
const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const tasksArr = ref([]);
const tasksComputed = computed(() => {
  let arr = [];
  arr = tasksArr.value;
  // if (
  //   tableSelectModel.value == "All" ||
  //   tableSelectModel.value == "Total Tasks"
  // ) {

  //   return (arr = tasksArr.value);
  // } else if (tableSelectModel.value == "To Do") {
  //   arr = tasksArr.value.filter((f) => f.stage == "To Do");
  // } else if (tableSelectModel.value == "In Progress") {
  //   arr = tasksArr.value.filter((f) => f.stage == "In Progress");
  // } else if (tableSelectModel.value == "Completed") {
  //   arr = tasksArr.value.filter((f) => f.stage == "Completed");
  // }

  return arr;
});

const tableDesign = ref([
  { header: "Title", field: "title", wid: "300px", simple: true },
  {
    header: "Assignees",
    field: "assignees",
    wid: "150px ",
    arrayOfObjectSlot: true,
  },
  { header: "Stage", field: "stage", wid: "100px" },
  { header: "Priority", field: "priority", wid: "100px", simple: true },
  { header: "Tags", field: "tags", wid: "150px", simpleArraySlot: true },
  { header: "Start Date", field: "startDate", wid: "200px", DateSlot: true },
  { header: "End Date", field: "endDate", wid: "200px", DateSlot: true },
  {
    header: "Estimated Time",
    field: "estimatedTime",
    wid: "100px",
    objectSlot: true,
  },
]);

const cardsArr = computed(() => {
  let Arr = [];
  Arr = [
    {
      name: "Total Tasks",
      iconComp: Summary,
      uiNum: tasksArr.value.length,
      cardColor:
        "bg-blue-100 text-blue-800 border-blue-100 shadow hover:shadow-xl ",
      iconColor: "bg-blue-500 text-blue-100 p-1 rounded-full size-7 md:size-8",
    },
    {
      name: "To Do",
      iconComp: ListTodo,
      uiNum: tasksArr.value.reduce((acc, i) => {
        if (i.stage == "To Do") ++acc;
        return acc;
      }, 0),
      cardColor:
        "bg-red-100 text-red-700 border-red-200/70  shadow hover:shadow-xl ",
      iconColor: "bg-red-500 text-white p-1 rounded-full size-7 md:size-8",
    },
    {
      name: "In Progress",
      iconComp: Loader,
      uiNum: tasksArr.value.reduce((acc, i) => {
        if (i.stage == "In Progress") ++acc;
        return acc;
      }, 0),
      cardColor:
        "bg-amber-100 text-yellow-700 border-amber-100  shadow hover:shadow-xl ",
      iconColor: "bg-amber-500 text-white p-1 rounded-full size-7 md:size-8",
    },
    {
      name: "Completed",
      iconComp: Check,
      uiNum: tasksArr.value.reduce((acc, i) => {
        if (i.stage == "Completed") ++acc;
        return acc;
      }, 0),
      cardColor:
        "bg-green-100 text-green-800 border-green-100 shadow hover:shadow-xl ",
      iconColor:
        "bg-green-500 text-green-100 p-1 rounded-full size-7 md:size-8",
    },
    // {
    //   name: "Overdue",
    //   iconComp: FileWarning,
    //   uiNum: 3,
    //   cardColor: "bg-red-100 text-red-800 ",
    //   iconColor: "bg-red-600 text-red-50 p-1 rounded-full size-6 md:size-7",
    // },
  ];
  return Arr;
});
const actionsArr = ref([
  { name: "edit", iconComp: Edit },
  { name: "delete", iconComp: Trash },
]);

// chart data
const chartDataset = computed(() => {
  if (tasksArr.value.length == 0) {
    return {
      labels: ["To do", "In Progress", "Completed"],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ["#3B82F6", " #F59E0B  ", "#10B981"],
        },
      ],
    };
  } else {
    return {
      labels: ["To do", "In Progress", "Completed"],
      datasets: [
        {
          data: [
            (tasksArr.value.reduce((acc, i) => {
              if (i.stage == "To Do") ++acc;
              return acc;
            }, 0) /
              tasksArr.value.length) *
              100,
            (tasksArr.value.reduce((acc, i) => {
              if (i.stage == "In Progress") ++acc;
              return acc;
            }, 0) /
              tasksArr.value.length) *
              100,
            (tasksArr.value.reduce((acc, i) => {
              if (i.stage == "Completed") ++acc;
              return acc;
            }, 0) /
              tasksArr.value.length) *
              100,
          ],
          backgroundColor: ["#FF0000", " #F59E0B  ", "#10B981"],
        },
      ],
    };
  }
});
// chart data

const selectionsArr = ref(["All", "To Do", "In Progress", "Completed"]);
const tableSelectModel = ref("All");
// DELETE WORK
const deleteFun = (toBeDelete, type) => {
  addEditMarker.value = true;
  editDeleteObj.value = {};
  editDeleteObj.value = toBeDelete;
  diaType.value = type;
  // deleteTask(toBeDelete.id);
};
// DELETE WORK
// EDIT WORK
const editOpen = (toBeEdit, type) => {
  addEditMarker.value = true;
  editDeleteObj.value = {};
  editDeleteObj.value = toBeEdit;
  diaType.value = type;
};
// EDIT WORK
// GLOBAL SEARCH
const searchRefresh = (gS) => {
  console.log(gS);
  searchTasks(gS).then((res) => {
    console.log("taskThen", res);
    tasksArr.value = res;
  });
};
// GLOBAL SEARCH

const refreshFun = () => {
  getAllTasks().then((res) => {
    tasksArr.value = res.filter((f) =>
      f.assignees.some((s) => s.id == userFromStore.loggedInUser.id),
    );
  });
  closeDia();
};
onMounted(() => {
  refreshFun();
});
</script>
<!-- const taskLocal = ref({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    createdBy: null,
    priority: "",
    assignees: [],
    moduleName: "",
    tags: [],
    estimatedTime: { h: 0, m: 0 },
    loggedTime: [],
    attachments: [],
    startTime: null,
    endTime: null,
    stage: "To Do",
    comments: [],
    history: [],    
  }
) -->
