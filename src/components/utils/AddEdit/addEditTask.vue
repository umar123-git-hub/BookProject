<template>
  <Teleport to="#Tel">
    <div
      @click="closeDia"
      class="fixed inset-0 w-full h-full z-50 bg-black/70"
      :class="logTimeDiaMarker ? 'hidden' : ''"
    >
      <!--=================== ABSOLUTE AREA ========================-->
      <div
        @click.stop
        class="absolute flex top-1/2 shadow shadow-gray-400 rounded-lg min-w-[40%] max-w-[40%] left-1/2 -translate-1/2 bg-amber-50"
        :class="diaType == 'edit' ? 'min-w-[70%] max-w-[70%]' : ''"
      >
        <!--================== LEFT SIDE ====================-->
        <div class="flex flex-2 flex-col gap-1">
          <!------- written or Cancel ------->
          <div
            class="flex border-b border-gray-300 px-4 md:px-4 lg:px-5 py-2 md:py-3 justify-between"
          >
            <div class="font-medium text-xl">
              {{
                editDeleteObj == null
                  ? "Add"
                  : editDeleteObj !== null && diaType == "edit"
                    ? "Edit"
                    : diaType == "delete"
                      ? "Delete"
                      : ""
              }}
              Task
              <!-- <span class="bg-green-400 px-3 py-1">{{
              Object.keys(editDeleteObj).length
            }}</span> -->
            </div>
            <X @click="closeDia" class="text-gray-400"></X>
          </div>
          <!------- written or Cancel ------->
          <!-- ADD EDIT CONTENT -->
          <div v-if="diaType !== 'delete'" class="flex flex-col">
            <!-- Main CONTENT -->
            <div class="flex flex-col gap-4">
              <!------- Task Title ------->
              <label class="flex flex-col gap-1 px-4">
                <div class="text-xs font-semibold text-gray-800">Title :</div>
                <input
                  type="text"
                  class="outline-none px-1 md:px-2 py-1 md:py-1 text-xs text-gray-800 border border-gray-400 focus:border-gray-300 rounded"
                  v-model="taskLocal.title"
                />
              </label>
              <!------- Task Title ------->
              <!------- Task Description ------->
              <label class="flex flex-col line gap-2 px-4">
                <div class="text-xs font-semibold text-gray-800">
                  Description :
                </div>
                <textarea
                  class="w-full resize-y rounded text-xs text-gray-800 border border-gray-300 outline-none px-2 py-1"
                  placeholder="Write something..."
                  v-model="taskLocal.description"
                ></textarea>
              </label>
              <!------- Task Description ------->

              <!--================== FIELDS ====================-->
              <div class="flex flex-col">
                <!--=============================== Add CONTENT ===========================-->
                <div class="flex flex-col gap-1 px-4">
                  <div class="text-xs font-semibold text-gray-800">
                    Fields :
                  </div>
                  <div
                    class="flex flex-col text-slate-900 bg-stone-200 border border-gray-300 rounded-lg"
                  >
                    <!-- start and due -->
                    <div class="grid grid-cols-12 border-b border-gray-400">
                      <div
                        class="flex items-center gap-1 px-2 py-1 pt-2 col-span-6 lg:col-span-4"
                      >
                        <Calendar class="size-2 md:size-3"></Calendar>

                        <div class="text-xs md:text-xs">Start / End</div>
                      </div>
                      <div
                        class="flex items-center gap-1 col-span-6 lg:col-span-8 border-l px-2 border-gray-400"
                      >
                        <div class="flex items-center gap-1">
                          <VueDatePicker
                            v-model="taskLocal.startDate"
                            format="MMM dd"
                            placeholder="Start"
                            auto-apply
                            teleport
                            :enable-time-picker="false"
                          >
                            <template #trigger>
                              <Calendar
                                class="size-2 md:size-3 cursor-pointer"
                              />
                            </template>
                          </VueDatePicker>
                          <div class="text-xs md:text-xs">
                            {{
                              taskLocal.startDate == null
                                ? "Start"
                                : format(taskLocal.startDate, "dd MMM yyyy")
                            }}
                          </div>
                        </div>
                        <ArrowBigRight class="size-2 md:size-3"></ArrowBigRight>
                        <div class="flex items-center gap-1">
                          <div class="text-xs md:text-xs">
                            {{
                              taskLocal.endDate == null
                                ? "End"
                                : format(taskLocal.endDate, "dd MMM yyyy")
                            }}
                          </div>
                          <VueDatePicker
                            v-model="taskLocal.endDate"
                            format="MMM dd"
                            placeholder="Start"
                            auto-apply
                            teleport
                            :enable-time-picker="false"
                          >
                            <template #trigger>
                              <Calendar
                                class="size-2 md:size-3 cursor-pointer"
                              />
                            </template>
                          </VueDatePicker>
                        </div>
                      </div>
                    </div>
                    <!-- start and due -->
                    <!-- labels -->
                    <div class="grid grid-cols-12 border-b border-gray-400">
                      <div
                        class="flex items-center gap-1 px-2 col-span-6 lg:col-span-4"
                      >
                        <TagPlus class="size-2 md:size-3"></TagPlus>
                        <div class="text-xs">Labels</div>
                      </div>
                      <div
                        class="flex gap-0.5 items-center justify-between relative col-span-6 lg:col-span-8 border-l px-2 py-0.5 border-gray-400"
                      >
                        <!-- ref="tagsCell" -->
                        <input
                          type="text"
                          v-model="labelModel"
                          @keydown.enter="labelPush()"
                          placeholder="Type here ..."
                          class="outline-none ring ring-gray-400 focus:ring-gray-500 bg-white py-1 text-black placeholder:text-black text-xs px-2 rounded"
                        />
                        <div class="w-full" v-if="taskLocal.tags.length == 0">
                          Please Enter
                        </div>
                        <div
                          v-else
                          class="flex items-center w-full gap-2 line-clamp-1 border border-gray-400 text-xs rounded overflow-x-auto scrollCustom"
                        >
                          <template v-for="tag in taskLocal.tags">
                            <div
                              class="bg-gray-700 px-2 text-white rounded relative group"
                            >
                              {{ tag }}
                              <X
                                @click="chooseFilterForTags(tag)"
                                class="absolute hidden group-hover:block size-3 cursor-pointer -top-1 -right-2 bg-red-300 rounded text-white"
                              ></X>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <!-- labels -->
                    <!--=============================== Assignees =====================================-->
                    <div class="grid grid-cols-12 border-b border-gray-400">
                      <div
                        class="flex items-center gap-1 px-2 col-span-6 lg:col-span-4"
                      >
                        <CircleUserRound
                          class="size-2 md:size-3"
                        ></CircleUserRound>
                        <div class="text-xs">Assignees</div>
                      </div>
                      <div
                        ref="assigneesCell"
                        class="flex items-center gap-2 col-span-6 lg:col-span-8 border-l border-gray-400"
                      >
                        <!-- plus and selected show TOGGLE AND CHANGE -->
                        <div
                          v-if="conversionMarker !== 'multi'"
                          class="w-full px-2 py-2 flex items-center"
                        >
                          <Plus
                            @click="conversionFun('multi')"
                            class="size-2 md:size-3 cursor-pointer"
                          ></Plus>
                          <!------- PFP OR INTIAL LETTER DECISION ------->
                          <div class="flex items-center gap-2 flex-wrap px-1">
                            <template
                              v-for="s in taskLocal.assignees"
                              :key="s.id"
                            >
                              <div
                                v-if="s.pfp"
                                class="flex relative group gap-1 items-center"
                              >
                                <img
                                  :src="s.pfp"
                                  class="size-5 lg:size-6 rounded-full"
                                  alt=""
                                />
                                <X
                                  class="absolute hidden group-hover:block size-3 cursor-pointer -top-2 -right-1 bg-red-300 rounded text-white"
                                ></X>
                              </div>
                              <div
                                v-else
                                class="px-2 py-1 relative group text-xs text-white bg-mauve-500 rounded-full"
                              >
                                {{
                                  s.name
                                    .split(" ")
                                    .map((s) =>
                                      s.slice(0, 1).toLocaleUpperCase(),
                                    )
                                    .join("")
                                }}
                                <X
                                  @click="chooseFilterForAssignees(s)"
                                  class="absolute hidden group-hover:block size-3 cursor-pointer -top-2 -right-1 bg-red-300 rounded text-white"
                                ></X>
                              </div>
                            </template>
                          </div>
                          <!------- PFP OR INTIAL LETTER DECISION ------->
                        </div>
                        <!-- plus and selected show TOGGLE AND CHANGE -->
                        <!------- MULTI SELECT ------->
                        <Multi
                          v-else-if="conversionMarker == 'multi'"
                          v-model="taskLocal.assignees"
                          :multi-data="userFromStore.allUser"
                          :field="'name'"
                          class="w-full"
                        >
                          <!-- SELECTED IN MULTI IN UI IN slots -->
                          <template #multiHead="{ selected }">
                            <div
                              class="relative w-full px-2 flex items-center gap-1 bg-white border border-blue-400"
                            >
                              <div
                                class="text-xs py-1"
                                v-if="selected.length == 0"
                              >
                                Please Select
                              </div>
                              <template v-for="select in selected">
                                <div
                                  v-if="select.pfp"
                                  class="flex relative group gap-1 items-center"
                                >
                                  <img
                                    :src="select.pfp"
                                    class="size-5 lg:size-6 rounded-full"
                                    alt=""
                                  />
                                </div>
                                <div
                                  v-else
                                  class="px-2 py-1 text-xs text-white bg-mauve-500 rounded-full"
                                >
                                  {{
                                    select.name
                                      .split(" ")
                                      .map((s) =>
                                        s.slice(0, 1).toLocaleUpperCase(),
                                      )
                                      .join("")
                                  }}
                                </div>
                              </template>
                            </div>
                          </template>
                          <!-- SELECTED IN MULTI IN UI IN slots -->

                          <!-- SELECTION AREA IN MULTI SELECT IN MULTI SLOTS -->
                          <!-- <template
                            #multiDrop="{ showOptions, multiData, selected }"
                          >
                            <div
                              v-if="showOptions"
                              class="absolute top-full bg-white w-full"
                            >
                              <template
                                v-for="val in multiData"
                                :key="val.id"
                              >
                                <label class="flex gap-1 px-3 py-1">
                                  <input
                                    type="checkbox"
                                    :value="val"
                                    v-model="selected"
                                  />
                                  <div class="flex gap-1">
                                    {{ val.name }}
                                  </div>
                                </label>
                              </template>
                            </div>
                          </template> -->
                          <template #multiSingleName="{ dataSingle }">
                            <div class="px-2">
                              {{ dataSingle }}
                            </div>
                          </template>
                          <!-- SELECTION AREA IN MULTI SELECT IN MULTI SLOTS -->
                        </Multi>
                        <!------- MULTI SELECT ------->
                      </div>
                    </div>

                    <!--=============================== Assignees =====================================-->
                    <!-- time -->
                    <div class="grid grid-cols-12 border-b border-gray-400">
                      <div
                        class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
                      >
                        <Clock class="size-2 md:size-3"></Clock>
                        <div class="text-xs">Estimated Time</div>
                      </div>
                      <div
                        @click="conversionFun('time')"
                        v-if="conversionMarker !== 'time'"
                        class="flex items-center text-xs gap-2 col-span-6 lg:col-span-8 border-l px-2 border-gray-400"
                      >
                        Add estimated time
                      </div>
                      <div
                        ref="timeCell"
                        v-else-if="conversionMarker == 'time'"
                        class="flex items-center text-sm md:text-base gap-1 col-span-6 lg:col-span-8 border-l px-2 py-1 border-gray-400"
                      >
                        <label class="flex items-center gap-1">
                          <div class="text-xs">Hour :</div>
                          <input
                            type="number"
                            class="w-1/2 pl-2 text-xs outline-none border border-gray-400 rounded"
                            v-model="taskLocal.estimatedTime.h"
                          />
                        </label>
                        <label class="flex items-center gap-1">
                          <div class="text-xs">Min:</div>
                          <input
                            type="number"
                            class="w-1/2 pl-2 text-xs outline-none border border-gray-400 rounded"
                            v-model="taskLocal.estimatedTime.m"
                          />
                        </label>
                      </div>
                    </div>
                    <!-- time -->
                  </div>
                </div>
                <!--=============================== Add CONTENT ===========================-->

                <!--=============================== EDIT CONTENT ===========================-->
                <div v-if="diaType == 'edit'" class="px-4 flex flex-col">
                  <!--============= PRIORITY ===========-->
                  <div class="grid grid-cols-12 border-b border-gray-400">
                    <div
                      class="flex items-center gap-1 px-2 col-span-6 lg:col-span-4"
                    >
                      <CircleStar class="size-3"></CircleStar>
                      <div class="text-xs">Priority</div>
                    </div>
                    <div
                      class="flex items-center gap-2 col-span-6 lg:col-span-8 border-l border-gray-400"
                    >
                      <!-- ref="PriorityCell" -->
                      <DropDown
                        :drop-arr="priorityArr"
                        v-model="taskLocal.priority"
                      >
                        <template
                          #dropSelectShow="{ selectedDrop, dropsPanelShow }"
                        >
                          <div
                            class="px-2 py-1 h-full cursor-pointer text-xs w-full flex justify-between items-center"
                          >
                            <div>
                              {{ selectedDrop || "Please Select" }}
                            </div>
                            <ChevronDown
                              :class="
                                dropsPanelShow ? 'rotate-180' : 'rotate-0'
                              "
                              class="size-3 transition-all duration-300"
                            />
                          </div>
                        </template>
                        <template #dropsPanel="{ drop }">
                          <div
                            class="text-xs transition-all duration-200 hover:bg-mauve-400 px-2 py-1"
                          >
                            {{ drop }}
                          </div>
                        </template>
                      </DropDown>
                    </div>
                  </div>
                  <!--============= PRIORITY ===========-->
                  <!--============= STAGES ===========-->
                  <div class="grid grid-cols-12 border-b border-gray-400">
                    <div
                      class="flex items-center gap-1 px-2 col-span-6 lg:col-span-4"
                    >
                      <Podium class="size-3"></Podium>
                      <div class="text-xs">Stage</div>
                    </div>
                    <div
                      class="flex items-center gap-2 col-span-6 lg:col-span-8 border-l border-gray-400"
                    >
                      <!-- ref="PriorityCell" -->
                      <DropDown :drop-arr="stageArr" v-model="taskLocal.stage">
                        <template
                          #dropSelectShow="{ selectedDrop, dropsPanelShow }"
                        >
                          <div
                            class="px-2 py-1 h-full cursor-pointer text-xs w-full flex justify-between items-center"
                          >
                            <div>
                              {{ selectedDrop || "Please Select" }}
                            </div>
                            <ChevronDown
                              :class="
                                dropsPanelShow ? 'rotate-180' : 'rotate-0'
                              "
                              class="size-3 transition-all duration-300"
                            />
                          </div>
                        </template>
                        <template #dropsPanel="{ drop }">
                          <div
                            class="text-xs transition-all duration-200 hover:bg-mauve-400 px-2 py-1"
                          >
                            {{ drop }}
                          </div>
                        </template>
                      </DropDown>
                    </div>
                  </div>
                  <!--============= STAGES ===========-->
                  <!--============= LOGGED TIME ===========-->
                  <div class="grid grid-cols-12 border-b border-gray-400">
                    <div
                      class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
                    >
                      <Clock class="size-2 md:size-3"></Clock>
                      <div class="text-xs">Logged Time</div>
                    </div>
                    <div
                      ref="logTimeOptionsCell"
                      @click="logTimeOptionsMarker = !logTimeOptionsMarker"
                      class="relative flex items-center cursor-pointer text-xs gap-2 col-span-6 lg:col-span-8 border-l px-2 border-gray-400"
                    >
                      Logged Time
                      <!-- Log time options  -->
                      <div
                        @click.stop
                        v-if="logTimeOptionsMarker"
                        class="absolute bottom-full left-1/12 flex flex-col min-w-1/2 px-1 py-1 bg-gray-100 rounded border border-gray-400 shadow shadow-black/80"
                      >
                        <template v-for="logT in logTimeSelectArr" :key="logT">
                          <div
                            class="flex items-center px-2 py-1 gap-1 hover:bg-blue-700 hover:text-white transition-all duration-150 rounded"
                            @click="LogTimeDiaSelectFun(logT.name)"
                          >
                            <component
                              class="size-3 stroke-2"
                              :is="logT.iconComp"
                            />
                            <div class="text-xs">{{ logT.name }}</div>
                          </div>
                        </template>
                      </div>
                      <!-- Log time options  -->
                    </div>
                  </div>
                  <!--============= LOGGED TIME ===========-->
                </div>
                <!--=============================== EDIT CONTENT ===========================-->
              </div>
              <!--================== FIELDS ====================-->
            </div>
            <!-- Main CONTENT -->
          </div>
          <!-- ADD EDIT CONTENT -->
          <!--=============== DELETE ==============-->
          <div v-else class="flex flex-col gap-3 px-4">
            <div>
              Are You Sure To Delete
              <span class="font-bold">{{ editDeleteObj.title }}</span> ???
            </div>
          </div>
          <!--=============== DELETE ==============-->
          <!------- BUTTONS  ------->
          <div class="flex items-center gap-2 px-4 pt-2 pb-4">
            <button
              @click="
                editDeleteObj == null
                  ? addTaskFun()
                  : editDeleteObj !== null && diaType == 'edit'
                    ? editTaskFun()
                    : diaType == 'delete'
                      ? deleteTaskFun()
                      : ''
              "
              class="px-4 py-1 bg-blue-600 text-white rounded"
            >
              {{
                editDeleteObj == null
                  ? "Add"
                  : editDeleteObj !== null && diaType == "edit"
                    ? "Edit"
                    : diaType == "delete"
                      ? "Delete"
                      : ""
              }}
            </button>
            <button
              @click="closeDia"
              class="px-3 py-1 cursor-pointer bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
          <!------- BUTTONS  ------->
        </div>
        <!--================== LEFT SIDE ====================-->
        <!--================== RIGHT SIDE ====================-->
        <div
          v-if="diaType == 'edit'"
          class="border-l w-1/2 flex-1 border-gray-300"
        >
          asas
        </div>
        <!--================== RIGHT SIDE ====================-->
      </div>
      <!--=================== ABSOLUTE AREA ========================-->
      <LoggedTimeDia
        v-if="logTimeDiaMarker"
        @closeLogTimeDia="closeLogTimeDia"
        v-model="taskLocal.loggedTime"
        :dia-type="logTimeDiaType"
        :log-by="userFromStore.loggedInUser"
      ></LoggedTimeDia>
    </div>
  </Teleport>
</template>
<script setup>
import {
  ArrowBigRight,
  Calendar,
  CircleStar,
  CircleUserRound,
  ChevronDown,
  Clock,
  Plus,
  TagPlus,
  X,
  Podium,
  TrainTrack,
  ArrowBigDown,
} from "@lucide/vue";
import { format } from "date-fns";
import { onClickOutside } from "@vueuse/core";
import { defineAsyncComponent, onMounted, ref, Teleport, toRaw } from "vue";
import { useUsersStore } from "../../../Store/UsersStore.js";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  addTask,
  getAllTasks,
  editTask,
  deleteTask,
} from "../../../services/TaskService.js";
const Multi = defineAsyncComponent(
  () => import("@/components/utils/Multi.vue"),
);
const DropDown = defineAsyncComponent(
  () => import("@/components/utils/DropDown.vue"),
);
const LoggedTimeDia = defineAsyncComponent(
  () => import("@/components/utils/LoggedTimeDia.vue"),
);
// import  from ;

// PROPS AND EMITS

const props = defineProps({
  diaType: {
    type: String,
    default: () => "",
  },
  editDeleteObj: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["hide", "refresh"]);
// PROPS AND EMITS
const userFromStore = useUsersStore();

// ---------------------MARKERS
const conversionMarker = ref("");
const logTimeOptionsMarker = ref(false);
const logTimeDiaMarker = ref(false);
// ---------------------MARKERS
const taskLocal = ref({
  title: "",
  description: "",
  createdBy: userFromStore.loggedInUser.id,
  priority: "Low",
  assignees: [],
  moduleName: "",
  tags: [],
  estimatedTime: { h: 0, m: 0 },
  loggedTime: [],
  attachments: [],
  startDate: null,
  endDate: null,
  stage: "To Do",
  comments: [],
  history: [],
});

//============================================ ADD, EDIT, AND DELETE FUNCTIONS
///////////////Add Task
const addTaskFun = () => {
  addTask(taskLocal.value).then((res) => {
    emit("refresh");
  });
  // userFromStore.refreshMarker++;
};
///////////////Add Task
///////////////EDIT Task
const editTaskFun = () => {
  editTask(taskLocal.value).then((res) => {
    emit("refresh");
  });
};
///////////////EDIT Task
///////////////DELETE Task
const deleteTaskFun = () => {
  deleteTask(taskLocal.value.id).then((res) => {
    emit("refresh");
  });
};
///////////////DELETE Task
//============================================ ADD, EDIT, AND DELETE FUNCTIONS

const conversionFun = (name) => {
  conversionMarker.value = name;
};

//=========================== PROP ARRAYS
const priorityArr = ref(["Low", "Medium", "High", "P1", "P2", "P3"]);
const stageArr = ref(["To Do", "In Progress", "Completed"]);
const logTimeSelectArr = ref([
  { name: "Track Manually", iconComp: TrainTrack },
  { name: "Logged Time Details", iconComp: ArrowBigDown },
]);
//=========================== PROP ARRAYS

// LABEL WORK
const labelModel = ref("");
const labelPush = () => {
  if (labelModel.value == "") {
    return;
  }
  taskLocal.value.tags.push(labelModel.value);
  labelModel.value = "";
};
// LABEL WORK
///////////////////////////// chooseFilterFun
const chooseFilterForTags = (tag) => {
  taskLocal.value.tags = taskLocal.value.tags.filter((i) => i !== tag);
  console.log(taskLocal.value.tags);
};
const chooseFilterForAssignees = (s) => {
  taskLocal.value.assignees = taskLocal.value.assignees.filter((i) => i !== s);
  console.log(taskLocal.value.assignees);
};
///////////////////////////// chooseFilterFun

const closeDia = () => {
  taskLocal.value = {
    title: "",
    description: "",
    createdBy: userFromStore.loggedInUser.id,
    priority: "Low",
    assignees: [],
    moduleName: "",
    tags: [],
    estimatedTime: { h: 0, m: 0 },
    loggedTime: [],
    attachments: [],
    startDate: null,
    endDate: null,
    stage: "To Do",
    comments: [],
    history: [],
  };

  emit("hide");
};

// LOG TIME DIA HANDLING
const logTimeDiaType = ref("");
const LogTimeDiaSelectFun = (diaName) => {
  logTimeDiaMarker.value = !logTimeDiaMarker.value;
  logTimeDiaType.value = diaName;
};
const closeLogTimeDia = () => {
  logTimeDiaMarker.value = false;
  logTimeDiaType.value = "";
};
// LOG TIME DIA HANDLING

// ---------------------OUTSIDE CLICK
const tagsCell = ref(null);
const assigneesCell = ref(null);
const timeCell = ref(null);
const logTimeOptionsCell = ref(null);
// Only close if this cell's field is the one currently open.
// Otherwise clicking another "+" would be overwritten by this handler.
const closeIfActive = (name) => () => {
  if (conversionMarker.value === name) conversionMarker.value = "";
};

onClickOutside(tagsCell, closeIfActive("tags"));
onClickOutside(assigneesCell, closeIfActive("multi"));
onClickOutside(timeCell, closeIfActive("time"));
onClickOutside(logTimeOptionsCell, () => (logTimeOptionsMarker.value = false));
onMounted(() => {
  if (props.editDeleteObj !== null) {
    taskLocal.value = structuredClone(toRaw(props.editDeleteObj));
    console.log(taskLocal.value);
  }
});
</script>

<style scoped>
.conversionTransition-enter-from,
.conversionTransition-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.conversionTransition-enter-active,
.conversionTransition-leave-active {
  transition: all 0.5s ease;
}
.scrollCustom::-webkit-scrollbar {
  width: 10px; /* Vertical scrollbar width */
  height: 8px; /* Horizontal scrollbar height */
  background: #000000;
}
.scrollCustom::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 9999px;
  border: 1px solid #f3f4f6; /* Creates padding around the thumb */
}
</style>
