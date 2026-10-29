<template>
  <div class="relative p-2 flex flex-col gap-1">
    <div class="flex gap-1 border border-gray-400/80 px-2 py-0.5">
      <template v-if="writtenText.length !== 0" v-for="val in writtenText">
        <div @click="popFun(val)" class="border border-gray-400/70">
          {{ val }}
        </div>
      </template>
      <div v-else>Please Select</div>
    </div>
    <input
      type="text"
      class="outline-none border pl-2 py-0.5"
      @keydown.enter="addWrittenFun"
      v-model="written"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
const written = ref("");
const writtenText = defineModel({ type: Array });
const addWrittenFun = () => {
  writtenText.value.push(written.value);
};
const popFun = (val) => {
  writtenText.value = writtenText.value.filter((i) => i !== val);
};
</script>
