<template>
  <div class="flex flex-col gap-1 px-2 py-2">
    <!-- filter -->
    <div class="flex justify-between items-center px-2 bg-gray-300 rounded">
      <TableIcon class=""></TableIcon>
      <div class="flex items-center justify-between gap-2">
        <!-- FILTERS -->
        <div class="relative w-full py-1 z-50">
          <Funnel
            @click="showFiltersMarker = !showFiltersMarker"
            class="cursor-pointer"
          ></Funnel>
          <div
            ref="filterCell"
            v-if="showFiltersMarker"
            class="absolute right-full bottom-full gap-2 bg-gray-100 border rounded-lg border-gray-300 shadow shadow-gray-800 px-4 py-2 flex flex-col"
          >
            <div class="grid grid-cols-2 items-center gap-20 w-100">
              <div class="text-sm font-semibold">Columns</div>
              <div class="">Value</div>
            </div>
            <!-- inputs -->
            <div class="flex flex-col items-center gap-2">
              <template
                v-for="Inps in filtersArr"
                :key="Inps"
              >
                <div class="flex items-center gap-2">
                  <div class="">
                    <input
                      v-model="Inps.k"
                      type="text"
                      class="outline-none ring ring-gray-400 focus:ring-gray-500 rounded px-1"
                    />
                  </div>
                  <div class="flex gap-1 items-center">
                    <input
                      v-model="Inps.v"
                      type="text"
                      class="outline-none ring ring-gray-400 focus:ring-gray-500 rounded px-1"
                    />
                    <X @click="delObj(Inps)" class="text-red-600 size-4 stroke-4 cursor-pointer"></X>
                  </div>
                </div>
              </template>
            </div>
            <!-- inputs -->
            <!-- buttons -->
            <div class="grid grid-cols-3 items-center gap-2">
              <button
                @click="clearFilters"
                class="bg-gray-300 text-black px-2 py-1 rounded text-sm font-semibold col-span-1"
              >
                Clear Filter
              </button>
              <button
                @click="addFilter"
                class="bg-gray-500 text-white px-2 py-1 rounded text-sm font-semibold col-span-1"
              >
                + Add Filter
              </button>
              <button
                @click="applyFilter"
                class="bg-red-700 text-white px-2 py-1 rounded text-sm font-semibold col-span-1"
              >
                Apply
              </button>
            </div>
            <!-- buttons-->
          </div>
        </div>
        <!-- FILTERS -->
        <!-- SEARCH -->
        <div class="relative w-full py-1 z-50">
          <Search
            @click="showSearchMarker = !showSearchMarker"
            class="cursor-pointer"
          ></Search>
          <div
            ref="searchCell"
            v-if="showSearchMarker"
            class="absolute top-1/2 right-full bg-gray-100 border rounded-lg border-gray-300 shadow shadow-gray-800 px-3 py-1 flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Search"
              v-model="globalSearchModel"
              class="outline-none ring ring-gray-400 focus:ring-gray-500 rounded px-1 py-1"
            />
            <button
              @click="globalSearchFun(globalSearchModel)"
              class="bg-red-500 text-white px-2 py-1 rounded"
            >
              Search
            </button>
          </div>
        </div>
        <!-- SEARCH -->
      </div>
    </div>
    <!-- filter -->
    <div class="w-full h-full overflow-auto">
      <table class="w-full relative table-fixed border-collapse text-center">
        <!--============ col width ===============-->
        <colgroup>
          <template
            v-for="tHeader in tableDesign"
            :key="tHeader"
          >
            <col :style="{ width: tHeader.wid }" />
          </template>
          <slot
            name="extraCol"
            v-if="$slots.extraCol"
          ></slot>
        </colgroup>
        <!--============ col width ===============-->
        <!--============ thead ===============-->
        <thead>
          <tr class="sticky top-0">
            <template
              v-for="tHeader in tableDesign"
              :key="tHeader"
            >
              <slot
                name="tableHeaderSlot"
                :t-header="tHeader"
                v-if="$slots.tableHeaderSlot"
              ></slot>
              <th v-else>{{ tHeader.header }}</th>
            </template>
            <slot
              name="extraTh"
              v-if="$slots.extraTh"
            ></slot>
          </tr>
        </thead>
        <!--============ thead ===============-->
        <!--============ tbody ===============-->
        <tbody>
          <template
            v-for="tableRow in tableArr"
            :key="tableRow.id"
          >
            <tr>
              <template
                v-for="tData in tableDesign"
                :key="tData"
              >
                <td>
                  <slot
                    name="simple"
                    :simple-data="tableRow[tData.field]"
                    v-if="$slots.simple && tData.simple"
                  ></slot>
                  <slot
                    name="simpleArraySlot"
                    :td-data="tableRow[tData.field]"
                    v-else-if="$slots.simpleArraySlot && tData.simpleArraySlot"
                  ></slot>
                  <slot
                    name="arrayOfObjectSlot"
                    :td-data="tableRow[tData.field]"
                    v-else-if="
                      $slots.arrayOfObjectSlot && tData.arrayOfObjectSlot
                    "
                  ></slot>
                  <slot
                    name="DateSlot"
                    :td-data="tableRow[tData.field]"
                    v-else-if="$slots.DateSlot && tData.DateSlot"
                  ></slot>
                  <slot
                    name="objectSlot"
                    :td-data="tableRow[tData.field]"
                    v-else-if="$slots.objectSlot && tData.objectSlot"
                  ></slot>
                  <div
                    v-else
                    class=""
                  >
                    {{ tableRow[tData.field] }}
                  </div>
                </td>
              </template>
              <slot
                name="extraTd"
                :table-row="tableRow"
                v-if="$slots.extraTd"
              ></slot>
            </tr>
          </template>
        </tbody>
        <!--============ tbody ===============-->
      </table>
    </div>
  </div>
</template>
<script setup>
import { Funnel, Search, TableIcon, X } from "@lucide/vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const props = defineProps({
  tableArr: Array,
  tableDesign: Array,
});
const emit = defineEmits(["searchRefresh"]);
const showSearchMarker = ref(false);
const showFiltersMarker = ref(false);

const globalSearchModel = ref("");

const globalSearchFun = () => {
  console.log(globalSearchModel.value);
  emit("searchRefresh", globalSearchModel.value);
};

const searchCell = ref(null);
const filterCell = ref(null);

const filtersArr = ref([{ id:crypto.randomUUID(), k: "", v: "" }]);
const addFilter = () => {
  if (
    filtersArr.value.at(filtersArr.value.length - 1).k == "" ||
    filtersArr.value.at(filtersArr.value.length - 1).v == ""
  ) {
    return console.log("erroe");
  }
  filtersArr.value.push({ id:crypto.randomUUID(), k: "", v: "" });
};
const clearFilters = () => {
  filtersArr.value = [];
  filtersArr.value.push({ id:crypto.randomUUID(),k: "", v: "" });
};
const applyFilter = () => {
  let filtersToSend = {};
  filtersArr.value.forEach((f) => {
    filtersToSend[f.k] = f.v;
  });
  console.log(filtersToSend);
};
const delObj = (o)=>{
  if(filtersArr.value.length==1){
    return
  }
  else{
    filtersArr.value=filtersArr.value.filter((i)=> i.id!==o.id)
  }
}
onClickOutside(searchCell, () => {
  showSearchMarker.value = false;
});
onClickOutside(filterCell, () => {
  clearFilters();
  showFiltersMarker.value = false;
});
</script>
