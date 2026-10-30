<template>
  <div class="absolute top-full left-0 flex w-full bg-white flex-col gap-1">
    <div class="px-2">
      <input
        type="text"
        class="outline-none border w-full"
      />
    </div>
    <div class="bg-white flex flex-col p-3">
      <template
        v-for="tag in tagArr"
        :key="tag"
      >
        <label class="flex">
          <input type="checkbox" />
          <div>{{ tag }}</div>
        </label>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const written = ref("");
const tagArr = ref(["In-progress", "High", "Low", "Medium"]);
const writtenText = defineModel({ type: Array });
const addWrittenFun = () => {
  writtenText.value.push(written.value);
  written.value = "";
};
const popFun = (val) => {
  writtenText.value = writtenText.value.filter((i) => i !== val);
};
</script>
