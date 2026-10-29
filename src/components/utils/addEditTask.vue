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
        <div>
          <!------- written or Cancel ------->
          <div class="flex">
            <div>Add Task</div>
            <X></X>
          </div>
          <!------- written or Cancel ------->
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
import { X } from "@lucide/vue";
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
