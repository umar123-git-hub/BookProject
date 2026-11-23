<template>
  <Teleport to="#Tel">
    <div
      @click="closeDia"
      class="fixed inset-0 w-full h-full z-40 bg-black/70"
    >
      <div
        @click.stop
        class="absolute flex flex-col max-w-1/2 min-w-1/3 top-1/2 shadow shadow-gray-400 rounded-lg left-1/2 -translate-1/2 bg-amber-50"
      >
        <!------- written or Cancel ------->
        <div
          class="flex border-b border-gray-300 px-4 lg:px-5 py-2 md:py-3 justify-between"
        >
          <div class="font-medium text-base">
            {{
              diaType == "Track Manually" ? "Add Time" : "Logged time Details"
            }}
          </div>
          <X
            @click="closeDia"
            class="text-gray-400"
          ></X>
        </div>
        <!------- written or Cancel ------->
        <!--======================== CONTENT AND BUTTONS =====================-->
        <div
          v-if="diaType == 'Track Manually'"
          class="flex flex-col gap-2"
        >
          <!------- CONTENT ------->
          <div class="flex flex-col gap-2">
            <!------- Date and time select ------->
            <div class="grid grid-cols-3 gap-3 px-4 lg:px-5 py-2 md:py-3">
              <!-- DATE -->
              <div class="flex flex-col gap-1">
                <div
                  :class="
                    logTimeObj.logDate == null
                      ? 'text-red-500 text-sm'
                      : 'text-black text-sm'
                  "
                >
                  Date
                </div>
                <VueDatePicker
                  auto-apply
                  teleport
                  v-model="logTimeObj.logDate"
                  class=""
                >
                  <template #trigger>
                    <div
                      v-if="logTimeObj.logDate == null"
                      class="flex items-center px-2 py-1 border border-gray-400 rounded justify-between gap-1 cursor-pointer"
                    >
                      <div class="text-xs">Select a Date</div>
                      <Calendar class="size-2 md:size-3 cursor-pointer" />
                    </div>
                    <div
                      v-else
                      class="flex items-center px-2 py-1 border border-gray-400 rounded justify-between cursor-pointer text-gray-600"
                    >
                      <div class="text-xs">
                        {{ format(logTimeObj.logDate, "dd MMM yyyy") }}
                      </div>
                      <X
                        @click.stop="logTimeObj.logDate = null"
                        class="size-2 md:size-3"
                      />
                    </div>
                  </template>
                </VueDatePicker>
              </div>
              <!-- DATE -->
              <!-- HOUR -->
              <div class="flex flex-col gap-1">
                <div
                  :class="
                    logTimeObj.logHour * 60 + logTimeObj.logMin == 0
                      ? 'text-red-500 text-sm'
                      : 'text-black text-sm'
                  "
                >
                  Hour
                </div>
                <input
                  class="w-full rounded text-xs text-gray-800 border border-gray-400 outline-none px-2 py-1"
                  type="number"
                  v-model="logTimeObj.logHour"
                  min="0"
                />
              </div>
              <!-- HOUR -->
              <!-- MIN -->
              <div class="flex flex-col gap-1">
                <div
                  :class="
                    logTimeObj.logHour * 60 + logTimeObj.logMin == 0
                      ? 'text-red-500 text-sm'
                      : 'text-black text-sm'
                  "
                >
                  Min
                </div>
                <input
                  class="w-full rounded text-xs text-gray-800 border border-gray-400 outline-none px-2 py-1"
                  type="number"
                  min="0"
                  max="59"
                  v-model="logTimeObj.logMin"
                />
              </div>
              <!-- MIN -->
            </div>
            <!------- Date and time select ------->
            <!-- Description -->
            <label class="flex flex-col line gap-2 px-4">
              <div class="text-xs font-semibold text-gray-800">
                Description :
              </div>
              <textarea
                class="w-full resize-y rounded text-xs text-gray-800 border border-gray-300 outline-none px-2 py-1"
                placeholder="Write something..."
                v-model="logTimeObj.LogDescription"
              ></textarea>
            </label>
            <!-- Description -->
            <!-- total logged time -->
            <div class="flex items-center text-sm gap-1 px-4">
              <div>Time Logged :</div>
              <div>{{ timeLoggedUi(totalMins) }}</div>
            </div>
            <!-- total logged time -->
          </div>
          <!------- CONTENT ------->
          <!------- BUTTONS  ------->
          <div class="flex items-center gap-2 px-4 pt-2 pb-4">
            <button
              @click="addLogTime"
              class="px-4 py-1 bg-blue-600 cursor-pointer text-white rounded"
            >
              Add
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
        <!--======================== CONTENT AND BUTTONS =====================-->
        <div v-else-if="diaType == 'Logged Time Details'">
          <div v-if="logModel.length !== 0">
            <table class="table-fixed border-collapse w-full">
              <thead>
                <tr>
                  <th>Logged By</th>
                  <th>Date</th>
                  <th>H</th>
                  <th>M</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="logTd in logModel"
                  :key="logTd"
                >
                  <tr>
                    <td>
                      <div class="flex items-center gap-3 px-3">
                        <div
                          @click="logTd.logMarker = !logTd.logMarker"
                          class="bg-gray-700 text-white cursor-pointer p-1 rounded"
                        >
                          <Plus class="size-4"></Plus>
                        </div>
                        <div>Log By</div>
                      </div>
                    </td>
                    <td>{{ format(logTd.logDate, "dd MMM yyyy") }}</td>
                    <td>{{ logTd.logHour }}</td>
                    <td>{{ logTd.logMin }}</td>
                  </tr>
                  <tr
                    v-if="logTd.logMarker"
                    class="fle"
                  >
                    <div>Description</div>
                    <div>{{ logTd.logDescription }}</div>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div
            v-else
            class="px-4 py-3 text-base"
          >
            No Time Logged
          </div>
        </div>
      </div>

      <Transition name="toastTransition">
        <div
          v-if="errMsg !== ''"
          class="bg-red-400 text-white z-60 px-8 py-4 rounded absolute bottom-3 left-3"
        >
          {{ errMsg }}
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
<script setup>
import { X, Calendar, Plus } from "@lucide/vue";
import { computed, ref, Teleport, Transition } from "vue";
import { format } from "date-fns";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  diaType: {
    type: String,
    default: () => "",
  },
});
const emit = defineEmits(["closeLogTimeDia"]);
const logModel = defineModel({ type: Array, default: () => [] });
const logTimeObj = ref({
  logDate: null,
  logHour: 0,
  logMin: 0,
  LogDescription: "",
});

// UI LOG TIME
const totalMins = computed(() => {
  const m = logModel.value
    .map((i) => i.logMin)
    .reduce((acc, i) => {
      return (acc += i);
    }, 0);
  const h = logModel.value
    .map((i) => i.logHour)
    .reduce((acc, i) => {
      return (acc += i);
    }, 0);

  // logModel.value.filter((i) => i.logHour);
  // const h = Number(logTimeObj.value.logHour) || 0;
  // return logTimeObj.value.logHour * 60 + logTimeObj.value.logMin;
  // const m = Number(logTimeObj.value.logMin) || 0;
  return h * 60 + m;
});
const timeLoggedUi = (t) => {
  let hours = Math.floor(t / 60);
  let mins = t % 60;
  return `${hours}h ${mins}m`;
};
// UI LOG TIME

//========================= ADDING AND CLOSING
const errMsg = ref("");
const resetLog = () => {
  logTimeObj.value.logDate = null;
  logTimeObj.value.logHour = 0;
  logTimeObj.value.logMin = 0;
  logTimeObj.value.LogDescription = "";
};
const addLogTime = () => {
  if (
    logTimeObj.value.logDate == null ||
    logTimeObj.value.logHour * 60 + logTimeObj.value.logMin == 0
  ) {
    errMsg.value = "Please Fill Required Fields";
    setTimeout(() => {
      errMsg.value = "";
    }, 3000);
    return;
  }
  let obj = {
    logDate: logTimeObj.value.logDate,
    logHour: logTimeObj.value.logHour,
    logMin: logTimeObj.value.logMin,
    logDescription: logTimeObj.value.LogDescription,
    logMarker: false,
  };
  logModel.value.push(obj);
  resetLog();
  emit("closeLogTimeDia");
};
const closeDia = () => {
  emit("closeLogTimeDia");
};
//========================= ADDING AND CLOSING
</script>
<style scoped>
.toastTransition-enter-from,
.toastTransition-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.toastTransition-enter-active,
.toastTransition-leave-active {
  transition: all 0.5s ease;
}
</style>
