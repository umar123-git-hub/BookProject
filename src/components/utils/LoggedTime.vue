<template>
  <div
    @click.stop
    class="fixed inset-0 top-0 left-0 w-full h-screen bg-gray-400/80"
  >
    <!--=========== dialog div ===========-->
    <div class="bg-white absolute top-1/2 left-1/2 -translate-1/2 rounded">
      <!--=========== top cancel bar div ===========-->
      <div class="flex gap-1 border-b border-gray-400">
        <div class="w-full text-xl font-semibold pl-2">Add Time</div>
        <div class="flex items-center justify-center px-2 w-max">
          <X class="size-4 text-gray-400 cursor-pointer"></X>
        </div>
      </div>
      <!--=========== top cancel bar div ===========-->
      <!--=========== content div ===========-->
      <div class="flex flex-col">
        <!-- Date Hour Minutes... -->
        <div class="flex gap-2 px-4 py-2">
          <div
            @click="showDatePicker = !showDatePicker"
            class="relative flex flex-col"
          >
            <div class="text-red-500">Date</div>
            <div v-if="model.dateModel==null"
              class="flex items-center text-xs gap-1.5 border border-gray-300 w-max px-1 cursor-pointer"
            >
              <div class="text-gray-400">select a date</div>
              <Calendar class="size-3.5"></Calendar>
            </div>
            <div v-else
            class="flex items-center text-xs gap-1.5 border border-gray-300 w-max px-1 cursor-pointer"
            >
              <div class="text-gray-400">{{ format(model.dateModel, "dd MMM yyyy") }}</div>
              <X @click.stop=" model.dateModel = null" class=" size-3.5"></X>
            </div>
            <VueDatePicker
              @date-click="showDatePicker = !showDatePicker"
              v-show="showDatePicker"
              class="absolute top-full"
              v-model="model.dateModel"
              inline
              auto-apply
              format="HH:mm"
            />
          </div>
          <label class="flex flex-col">
            <div class="text-red-500">Hour</div>
            <input
              type="number"
              min="0"
              max="12"
              v-model="model.hourModel"
              class="pl-2 py-0.5 text-sm outline-none border border-gray-300 w-20 rounded focus:border-black"
            />
          </label>
          <label class="flex flex-col">
            <div class="text-red-500">Minutes</div>
            <input
              type="number"
              min="0"
              max="60"
              v-model="model.MinutesModel"
              class="pl-2 py-0.5 text-sm outline-none border border-gray-300 w-20 rounded focus:border-black"
            />
          </label>
        </div>
        <!-- Date Hour Minutes -->
        <!-- Description -->
        <label class="flex flex-col px-2 pb-2">
          <div class="text-sm text-gray-700">Description</div>
          <textarea
            v-model="model.descriptionModel"
            class="w-full outline-none border border-gray-300 pl-2 py-1 text-sm focus:border-black rounded"
          ></textarea>
        </label>
        <!-- Description -->
        <div class="flex gap-2 px-2">
          <div class="text-gray-400 text-xs">Time Logged</div>
          <div class="text-xs">: 0h 0m</div>
        </div>
      </div>
      <!--=========== content div ===========-->
      <!--=========== Add Time or cancel div ===========-->
      <div>
        <!------- BUTTONS  ------->
        <div class="flex items-center justify-end gap-2 px-4 py-2">
          <button
            @click="addFun"
            class="px-2 bg-blue-400 text-white rounded"
          >
            Add
          </button>
          <button
            @click="$emit('hide')"
            class="px-3 cursor-pointer bg-gray-200 rounded"
          >
            Cancel
          </button>
        </div>
        <!------- BUTTONS  ------->
      </div>
      <!--=========== Add Time or cancel div ===========-->
    </div>
    <!--=========== dialog div ===========-->
  </div>
</template>

<script setup>
import { Calendar, X } from "@lucide/vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { ref } from "vue";
import { format } from "date-fns";

const emit = defineEmits(["hide","add"])

const showDatePicker = ref(false);

const addFun = ()=>{
  if(model.value.dateModel!==null&&model.value.hourModel!==0&&model.value.MinutesModel!==0){
    emit('add')
  }
  else{
    alert('Data not added please add data first')
  }
}

const model = defineModel({type:Object})
</script>
