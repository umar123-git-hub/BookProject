<template>
  <Teleport to="#Tel">
    <div
      @click="$emit('hide')"
      class="fixed inset-0 z-20 bg-black/20 backdrop-blur-3xl"
    >
      <!--=================== ABSOLUTE AREA ========================-->
      <div
        @click.stop
        class="absolute top-1/2 left-1/2 -translate-1/2 bg-amber-50 flex"
      >
        <!------- Add Task ------->
        <div class="flex flex-col gap-2">
          <!------- written or Cancel ------->
          <div class="flex border-b justify-between">
            <div class="font-medium">Add Task</div>
            <X class="text-gray-400"></X>
          </div>
          <!------- written or Cancel ------->
          <!------- Task Title ------->
          <label class="flex gap-4 px-2">
            <div class="text-gray-500">Task Name</div>
            <input
              type="text"
              class="border border-gray-400/60 px-2 outline-none"
            />
          </label>
          <!------- Task Title ------->
          <!------- Task Description ------->
          <label class="flex flex-col gap-2 px-2">
            <div class="text-gray-500">Task Description</div>
            <textarea
              class="border border-gray-400/60 px-2 outline-none"
            ></textarea>
          </label>
          <!------- Task Description ------->
          <!------- Task start/due ------->
          <div class="flex border border-gray-400/80">
            <div class="flex gap-2 px-4 py-0.5">
              <Calendar class="size-4 lg:size-5"></Calendar>
              <div>start/due</div>
            </div>
            <div class="border-l border-gray-400/80">1</div>
          </div>
          <!------- Task start/due ------->
          <!------- Task Labels ------->
          <div class="flex border border-gray-400/80">
            <div class="flex gap-2 px-4 py-0.5">
              <Tags class="size-4 lg:size-5"></Tags>
              <div>Labels</div>
            </div>
            <div class="border-l border-gray-400/80">1</div>
          </div>
          <!------- Task Labels ------->
          <!------- Task Assignees ------->
          <div class="flex border border-gray-400/80">
            <div class="flex gap-2 px-4 py-0.5">
              <CircleUserRound class="size-4 lg:size-5"></CircleUserRound>
              <div>Assignees</div>
            </div>
            <div class="border-l border-gray-400/80"></div>
          </div>
          <!------- Task Assignees ------->
          <!------- Task Time ------->
          <div class="flex border border-gray-400/80">
            <div class="flex gap-2 px-4 py-0.5">
              <Clock></Clock>
              <div>Time</div>
            </div>
            <div class="border-l border-gray-400/80"></div>
          </div>
          <!------- Task Time  ------->
          <!------- Add or Cancel  ------->
          <div></div>
          <!------- Add or Cancel  ------->
        </div>
        <!------- Add Task ------->
        <!------- Task history ------->
        <div></div>
        <!------- Task history ------->
      </div>
      <!--=================== ABSOLUTE AREA ========================-->
    </div>
  </Teleport>
</template>
<script setup>
import { Calendar, CircleUserRound, Clock, Tags, X } from "@lucide/vue";
import { ref, Teleport } from "vue";
const emit = defineEmits(["hide"]);
const taskLocal = ref({
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
