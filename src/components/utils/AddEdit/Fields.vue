<template>
  <!--================== FIELDS ====================-->
  <div class="flex flex-col gap-1 px-4 relative">
    <div class="text-xs font-semibold text-gray-800">Fields :</div>
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
                <Calendar class="size-2 md:size-3 cursor-pointer" />
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
                <Calendar class="size-2 md:size-3 cursor-pointer" />
              </template>
            </VueDatePicker>
          </div>
        </div>
      </div>
      <!-- start and due -->
      <!-- labels -->
      <div class="grid grid-cols-12 border-b border-gray-400">
        <div class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4">
          <TagPlus class="size-2 md:size-3"></TagPlus>
          <div class="text-xs">Labels</div>
        </div>
        <div
          class="flex gap-0.5 items-center justify-between relative col-span-6 lg:col-span-8 border-l px-2 py-1 border-gray-400"
        >
          <!-- ref="tagsCell" -->
          <div
            v-if="taskLocal.tags.length == 0"
            class="border flex-1 border-gray-400 px-2 text-xs text-gray-400 rounded"
          >
            Please Enter Tags ...
          </div>
          <div
            v-else
            class="flex flex-1 items-center w-full gap-2 px-1 py-0.5 line-clamp-1 border border-gray-400 text-xs rounded overflow-auto scrollbar-thin"
          >
            <template v-for="tag in taskLocal.tags">
              <div class="bg-gray-700 px-2 text-white rounded relative group">
                {{ tag }}
                <X
                  @click="chooseFilterForTags(tag)"
                  class="absolute hidden group-hover:block size-3 cursor-pointer -top-1 -right-2 bg-red-300 rounded text-white"
                ></X>
              </div>
            </template>
          </div>
          <input
            type="text"
            v-model="labelModel"
            @keydown.enter="labelPush()"
            placeholder="Enter here ..."
            class="outline-none border text-xs border-gray-400 px-2 rounded"
          />
        </div>
      </div>
      <!-- labels -->
      <!--=============================== Assignees =====================================-->
      <div class="grid grid-cols-12 border-b border-gray-400">
        <div class="flex items-center gap-1 px-2 col-span-6 lg:col-span-4">
          <CircleUserRound class="size-2 md:size-3"></CircleUserRound>
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
                      .map((s) => s.slice(0, 1).toLocaleUpperCase())
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
                        .map((s) => s.slice(0, 1).toLocaleUpperCase())
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
        <div class="flex items-center gap-1 px-2 py-2 col-span-6 lg:col-span-4">
          <Clock class="size-2 md:size-3"></Clock>
          <div class="text-xs">Estimated Time</div>
        </div>
        <div
          @click="conversionFun('time')"
          v-if="conversionMarker == ''"
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
  <!--================== FIELDS ====================-->
</template>
<script setup>
import { ref } from "vue";
</script>
