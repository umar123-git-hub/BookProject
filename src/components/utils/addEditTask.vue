<template>
  <Teleport to="#Tel">
    <div @click="$emit('hide')" class="fixed inset-0 z-20 bg-black/70">
      <!--=================== ABSOLUTE AREA ========================-->
      <div
        @click.stop
        class="absolute top-1/2 min-w-[80%] md:min-w-[35%] shadow shadow-gray-400 rounded-lg flex flex-col gap-4 left-1/2 -translate-1/2 bg-amber-50"
      >
        <!------- Add Task ------->

        <!------- written or Cancel ------->
        <div
          class="flex border-b border-gray-300 px-4 md:px-4 lg:px-5 py-2 md:py-3 justify-between"
        >
          <div class="font-medium text-xl">Add Task</div>
          <X class="text-gray-400"></X>
        </div>
        <!------- written or Cancel ------->
        <!------- Task Title ------->
        <label class="flex flex-col gap-1 px-4">
          <div class="text-base font-semibold text-gray-800">Title :</div>
          <input
            type="text"
            class="outline-none px-1 md:px-2 py-1 md:py-1 text-base text-gray-800 border border-gray-400 focus:border-gray-300 rounded"
          />
        </label>
        <!------- Task Title ------->
        <!------- Task Description ------->
        <label class="flex flex-col line gap-2 px-4">
          <div class="text-base font-semibold text-gray-800">Description :</div>
          <textarea
            class="w-full resize-y rounded text-base text-gray-800 border border-gray-300 outline-none px-2 py-1"
            placeholder="Write something..."
          ></textarea>
        </label>
        <!------- Task Description ------->
        <!--================== FIELDS ====================-->
        <div class="flex flex-col gap-1 px-4">
          <div class="text-base font-semibold text-gray-800">Fields :</div>
          <div
            class="flex flex-col text-slate-900 bg-stone-200 border border-gray-300 rounded-lg"
          >
            <!-- start and due -->
            <div class="grid grid-cols-12 border-b border-gray-400">
              <div
                class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
              >
                <Calendar class="size-3 md:size-4"></Calendar>

                <div class="text-xs md:text-sm">Start / End</div>
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
                      <Calendar class="size-3 md:size-4 cursor-pointer" />
                    </template>
                  </VueDatePicker>
                  <div class="text-xs md:text-sm">
                    {{
                      taskLocal.startDate == null
                        ? "Start"
                        : taskLocal.startDate
                    }}
                  </div>
                </div>
                <ArrowBigRight class="size-3 md:size-4"></ArrowBigRight>
                <div class="flex items-center gap-1">
                  <div class="text-xs md:text-sm">
                    {{ taskLocal.endDate == null ? "End" : taskLocal.endDate }}
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
                      <Calendar class="size-3 md:size-4 cursor-pointer" />
                    </template>
                  </VueDatePicker>
                </div>
              </div>
            </div>
            <!-- start and due -->
            <!-- labels -->
            <div class="grid grid-cols-12 border-b border-gray-400">
              <div
                class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
              >
                <TagPlus class="size-3 md:size-4"></TagPlus>
                <div class="text-xs md:text-sm">Labels</div>
              </div>
              <div
                ref="tagsCell"
                class="flex items-center gap-2 relative col-span-6 lg:col-span-8 border-l px-2 border-gray-400"
              >
                <div
                  @click="conversionFun('tags')"
                  v-if="conversionMarker !== 'tags'"
                >
                  <Plus
                    v-if="taskLocal.tags.length == 0"
                    class="size-3 md:size-4 cursor-pointer"
                  ></Plus>
                  <div v-else class="flex gap-2 flex-wrap px-1">
                    <template v-for="val in taskLocal.tags">
                      <div
                        class="text-xs px-1 py-0.5 flex justify-between gap-2 items-center bg-blue-500 text-white rounded"
                      >
                        <div>{{ val }}</div>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-else-if="conversionMarker == 'tags'" class="w-full">
                  <TextTaker v-model="taskLocal.tags"></TextTaker>
                </div>
              </div>
            </div>
            <!-- labels -->
            <!--=============================== Assignees =====================================-->
            <div class="grid grid-cols-12 border-b border-gray-400">
              <div
                class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
              >
                <CircleUserRound class="size-3 md:size-4"></CircleUserRound>
                <div class="text-xs md:text-sm">Assignees</div>
              </div>
              <div
                ref="assigneesCell"
                class="flex items-center gap-2 col-span-6 lg:col-span-8 border-l border-gray-400"
              >
                <!-- plus and selected show TOGGLE AND CHANGE -->
                <div
                  @click="conversionFun('multi')"
                  v-if="conversionMarker !== 'multi'"
                  class="w-full px-2"
                >
                  <Plus
                    v-if="taskLocal.assignees.length === 0"
                    class="size-3 md:size-4 cursor-pointer"
                  ></Plus>
                  <div v-else class="flex gap-2 flex-wrap px-1">
                    <template v-for="s in taskLocal.assignees" :key="s.id">
                      <div class="bg-green-800 text-sm text-white rounded">
                        {{ s.name }}
                      </div>
                    </template>
                  </div>
                </div>
                <!-- plus and selected show TOGGLE AND CHANGE -->
                <Multi
                  v-else-if="conversionMarker == 'multi'"
                  v-model="taskLocal.assignees"
                  :multi-data="userFromStore.allUser"
                  :field="'name'"
                  class="w-full"
                >
                  <!-- SELECTED IN MULTI IN UI IN slots -->
                  <template #multiHead="{ showOpsFun, selected }">
                    <div
                      @click="showOpsFun"
                      class="relative bg-white py-2 border border-blue-400 rounded"
                    >
                      <div v-if="selected.length === 0" class="px-2">
                        Please Select
                      </div>
                      <div
                        v-else
                        class="flex gap-2 items-center px-1 flex-wrap"
                      >
                        <template v-for="select in selected" :key="select.id">
                          <div
                            class="text-xs px-1 py-0.5 flex justify-between gap-2 items-center bg-blue-500 text-white rounded"
                          >
                            {{ select.name }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                  <!-- SELECTED IN MULTI IN UI IN slots -->

                  <!-- SELECTION AREA IN MULTI SELECT IN MULTI SLOTS -->
                  <template #multiDrop="{ showOptions, multiData }">
                    <div
                      v-if="showOptions"
                      class="absolute top-full bg-white w-full"
                    >
                      <template v-for="val in multiData" :key="val.id">
                        <label class="flex gap-1 px-3 py-1">
                          <input
                            type="checkbox"
                            :value="val"
                            v-model="taskLocal.assignees"
                          />
                          <div class="flex gap-1">
                            {{ val.name }}
                          </div>
                        </label>
                      </template>
                    </div>
                  </template>
                  <!-- SELECTION AREA IN MULTI SELECT IN MULTI SLOTS -->
                </Multi>
              </div>
            </div>
            <!--=============================== Assignees =====================================-->
            <!-- time -->
            <div class="grid grid-cols-12 border-b border-gray-400">
              <div
                class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4"
              >
                <Clock class="size-3 md:size-4"></Clock>
                <div class="text-xs md:text-sm">Time</div>
              </div>
              <div
                @click="conversionFun('time')"
                v-if="conversionMarker == ''"
                class="flex items-center text-sm md:text-base gap-2 col-span-6 lg:col-span-8 border-l px-2 border-gray-400"
              >
                Add estimated time
              </div>
              <div
                v-else-if="conversionMarker == 'time'"
                class="flex items-center text-sm md:text-base gap-2 col-span-6 lg:col-span-8 border-l px-2 py-1 border-gray-400"
              >
                <label class="flex flex-col">
                  <div class="text-sm">hour:</div>
                  <input
                    type="number"
                    class="w-2/3 outline-none border border-gray-400 rounded"
                    v-model="taskLocal.estimatedTime.h"
                  />
                </label>
                <label class="flex flex-col">
                  <div class="text-sm">min:</div>
                  <input
                    type="number"
                    class="w-2/3 outline-none border border-gray-400 rounded"
                    v-model="taskLocal.estimatedTime.m"
                  />
                </label>
                <!------- Upload or Cancel  ------->
                <div class="flex items-center gap-2 px-4">
                  <button
                    @click=""
                    class="px-2 py-1 text-sm bg-blue-400 text-white rounded"
                  >
                    Upload
                  </button>
                  <button
                    @click="conversionFun('')"
                    class="px-3 py-1 text-sm bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                </div>
                <!------- Upload or Cancel  ------->
              </div>
            </div>
            <!-- time -->
          </div>
        </div>
        <!--================== FIELDS ====================-->
        <!------- Add or Cancel  ------->
        <div class="flex items-center gap-2 px-4 pt-2 pb-4">
          <button
            @click="addTaskFun"
            class="px-4 py-1 bg-blue-400 text-white rounded"
          >
            Add
          </button>
          <button @click="$emit('hide')" class="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>
        </div>
        <!------- Add or Cancel  ------->
      </div>
      <!------- Add Task ------->
      <!------- Task history ------->
      <!-- <div></div> -->
      <!------- Task history ------->

      <!--=================== ABSOLUTE AREA ========================-->
    </div>
  </Teleport>
</template>
<script setup>
import {
  ArrowBigRight,
  ArrowRight,
  Calendar,
  CircleUserRound,
  Clock,
  Plus,
  TagPlus,
  Tags,
  X,
} from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";
import { defineAsyncComponent, ref, Teleport, watch } from "vue";
import { useUsersStore } from "../../Store/UsersStore";
import { useTaskStore } from "../../Store/TasksStore.js";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const TextTaker = defineAsyncComponent(() => import("./textTaker.vue"));
const Multi = defineAsyncComponent(() => import("./Multi.vue"));

const userFromStore = useUsersStore();
const tasksFromStore = useTaskStore();
const emit = defineEmits(["hide"]);

// ---------------------MARKERS
const conversionMarker = ref("");
watch(conversionMarker, (n) => {
  console.log(n);
});
// ---------------------MARKERS
const taskLocal = ref({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  createdBy: userFromStore.loggedInUser,
  priority: "",
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

///////////////Add Task
const addTaskFun = () => {
  if (taskLocal.value.assignees.length > 0) {
    tasksFromStore.allTasks.push(taskLocal.value);
  }
};
///////////////Add Task
const conversionFun = (name) => {
  conversionMarker.value = name;
};

// ---------------------OUTSIDE CLICK
const tagsCell = ref(null);
const assigneesCell = ref(null);

// Only close if this cell's field is the one currently open.
// Otherwise clicking another "+" would be overwritten by this handler.
const closeIfActive = (name) => () => {
  if (conversionMarker.value === name) conversionMarker.value = "";
};

onClickOutside(tagsCell, closeIfActive("tags"));
onClickOutside(assigneesCell, closeIfActive("multi"));
onClickOutside(assigneesCell, closeIfActive("time"));
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
