<template>
  <div
    class="relative overflow-hidden h-full w-full px-4 py-2 dark:bg-linear-to-r dark:from-blue-400 dark:to-blue-950"
  >
    <!-- BookMemberCirculation -->
    <div class="flex flex-col gap-4 p-2">
      <!-- Written and add -->
      <div class="flex flex-col gap-2">
        <!-- written and logo -->
        <div class="flex items-center gap-1.5">
          <BookOpen
            class="text-cream dark:text-beige bg-linear-to-tr from-emerald-950 to-green dark:grad-header size-9 px-1.5 rounded-xl"
          ></BookOpen>
          <div class="font-semibold text-lg dark:text-white">
            Circulation Management
          </div>
        </div>
        <!-- written and logo -->
        <!-- big written and add -->
        <div class="flex justify-between w-full items-center">
          <div
            class="font-bold text-4xl bg-linear-to-r from-blue-950 to-gray-700 bg-clip-text text-transparent dark:text-white"
          >
            CIRCULATIONS
          </div>
          <!-- ADD BTN -->
          <button
            @click="((loanDiaMarker = !loanDiaMarker), (dialog = 'Add'))"
            class="flex gap-2 items-center px-2.5 py-1.5 rounded-xl border border-gray-300 cursor-pointer bg-linear-to-r from-blue-700 to-gray-700 dark:from-white dark:to-gray-100"
          >
            <BookPlus class="size-4"></BookPlus>
            <div class="font-medium">Add Loan</div>
          </button>
          <!-- ADD BTN -->
        </div>
        <!-- big written and add -->
      </div>
      <!-- Written and add -->
      <!-- info card -->
      <div v-if="false" class="flex flex-col md:flex-row w-full md:w-2/3 gap-3">
        <template v-for="card in selectionArr" :key="card.name">
          <div
            @click="availableFun(card)"
            :class="card.backColor"
            class="flex cursor-pointer items-center gap-3 px-2.5 py-1 rounded-xl w-full"
          >
            <!-- icon  -->
            <component
              class="size-7 md:size-9"
              :class="card.iconColor"
              :is="card.iconComponent"
            ></component>
            <!-- icon -->
            <!-- written and number -->
            <div class="flex flex-col text-beige dark:text-emerald-800">
              <div class="text-xs font-medium text-price">
                {{ card.name }}
              </div>
              <div class="text-lg font-semibold text-price">
                {{ card.arrLength }}
              </div>
            </div>
          </div>

          <!-- written and number -->
        </template>
      </div>
      <!-- info card -->
    </div>
    <!-- BookMemberCirculation -->
    <!-- <div class="rounded overflow-hidden h-full"> -->
    <div class="overflow-auto h-2/3 rounded scrollbar-thin scroll-smooth">
      <TableG
        :tableArr="circulationFromStore.circulations"
        :actions="actions"
        v-model="selectedValueByTable"
      >
        <!-- TABLE HEADING -->
        <template #tableHeadingSlot="{ tableKeys }">
          <tr
            class="sticky top-0 border-r border-l border-blue-900 dark:border-white bg-linear-to-r from-blue-950 to-gray-800 text-white dark:bg-linear-to-r dark:from-white dark:to-amber-50 dark:text-black"
          >
            <template v-for="tableHeading in tableKeys" :key="tableHeading">
              <th v-if="tableHeading !== 'id' && tableHeading !== 'image'">
                <div class="text-center px-4 truncate">
                  {{ formatLabel(tableHeading) }}
                </div>
              </th>
            </template>
            <th>Actions</th>
          </tr>
        </template>
        <!-- TABLE HEADING -->
        <!-- TABLE ROW -->
        <template #tableRowSlot="{ tableRow, actions }">
          <tr class="">
            <template v-for="(tableData, key) in tableRow" :key="tableData">
              <td v-if="key !== 'id' && key !== 'image'">
                <div
                  v-if="!Array.isArray(tableData)"
                  class="px-4 py-1 text-center truncate dark:bg-blue-950 dark:text-white border-b border-b-blue-900 dark:border-b-white"
                >
                  {{
                    Array.isArray(tableData)
                      ? (memArrShow = true)
                      : typeof tableData == typeof {}
                        ? tableData.title
                        : tableData
                  }}
                </div>
                <div
                  v-else
                  class="flex items-center justify-center px-4 py-1 border-b border-b-blue-900 dark:border-b-white"
                >
                  <template v-for="nam in tableData">
                    <div>{{ nam.name }}</div>
                  </template>
                </div>
              </td>
            </template>
            <!-- Actions -->
            <td class=" ">
              <div
                class="flex items-center justify-center gap-2 px-4 py-1 dark:bg-blue-950 dark:text-white border-b border-b-blue-900 dark:border-b-white"
              >
                <template v-for="icon in actions">
                  <component
                    @click="
                      ((dialog = tableRow.name),
                      (pBook = tableRow.books),
                      (loanForReturn = tableRow),
                      (loanDiaMarker = !loanDiaMarker))
                    "
                    :is="icon.iconShow"
                  ></component>
                </template>
              </div>
            </td>
            <!-- Actions -->
          </tr>
        </template>
        <!-- TABLE ROW -->
      </TableG>
    </div>
    <!-- </div> -->
    <!------------------------ DIALOGUE -------------------->
    <CirculationDialogue
      v-if="loanDiaMarker"
      :dialog="dialog"
      :pBook="pBook"
      :loanForReturn="loanForReturn"
      @hide="loanDiaMarker = !loanDiaMarker"
    ></CirculationDialogue>
    <!------------------------ DIALOGUE -------------------->
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import TableG from "./TableG.vue";
import CirculationDialogue from "./CirculationDialogue.vue";
import { useCirculationStore } from "../Stores/CirculationStore.js";
import { useBookStore } from "../Stores/BookStore.js";
import {
  Edit,
  Image,
  Trash,
  BookAlert,
  BookCheck,
  BookOpen,
  BookPlus,
  Plus,
  Undo,
  s,
} from "@lucide/vue";
const circulationFromStore = useCirculationStore();
const booksFromStore = useBookStore();

const selectedValue = ref({});

const pBook = ref({});

const loanDiaMarker = ref(false);

const actions = ref([{ iconShow: Undo, name: "Return" }]);
// const capitalizeWords = (str) => {
//   return str
//     .trim()
//     .split()
//     .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
//     .join(" ");
// };
const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};
const selectedValueByTable = ref({});

const dialog = ref("");
const loanForReturn = ref({});

const selectionArr = ref([
  {
    name: "All Books",
    arrLength: computed(() => booksFromStore.books.length),
    className: "text-blue-700  ",
    iconComponent: BookOpen,
    iconColor: " dark:text-main text-emerald-200",
    backColor: "bg-linear-to-l from-green  to-emerald-800 dark:grad-available",
  },
  {
    name: "Available Books",
    arrLength: computed(
      () => booksFromStore.books.filter((i) => i.availableInStore > 0).length,
    ),
    className: "text-green-700 ",
    iconComponent: BookCheck,
    iconColor: "dark:text-main  text-cyan-300/80",
    backColor: "dark:grad-all bg-linear-to-l from-blue-300  to-blue-800",
  },
  {
    name: "Borrowed Books",
    arrLength: computed(
      () => booksFromStore.books.filter((i) => i.availableInStore == 0).length,
    ),
    className: "text-red-700 ",
    iconComponent: BookAlert,
    iconColor: "dark:text-main text-red-200",
    backColor: "grad-borrowed",
  },
]);
</script>
