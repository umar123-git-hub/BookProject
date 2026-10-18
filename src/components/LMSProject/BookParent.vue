<template>
  <div
    class="relative overflow-hidden h-full w-full px-4 py-2 dark:bg-linear-to-r dark:from-blue-900 dark:to-blue-950"
  >
    <!-- BookMemberCirculation -->
    <div class="flex flex-col gap-4 p-2">
      <!-- Written and add -->
      <div class="flex flex-col gap-2">
        <!-- written and logo -->
        <div class="flex items-center gap-1.5">
          <BookOpen
            class="text-gray-100 dark:text-gray-950 bg-linear-to-l from-gray-800 via-blue-600 to-blue-800 dark:from-blue-300 dark:via-blue-100 dark:via-5% dark:to-blue-300 size-9 px-1.5 rounded-xl"
          ></BookOpen>
          <div class="font-semibold text-lg dark:text-white">
            Books Management
          </div>
        </div>
        <!-- written and logo -->
        <!-- big written and add -->
        <div class="flex justify-between w-full items-center">
          <div
            class="font-bold text-4xl bg-linear-to-l from-gray-800 via-blue-600 to-blue-800 dark:from-blue-300 dark:via-blue-100 dark:via-5% dark:to-blue-300 bg-clip-text text-transparent"
          >
            BOOKS
          </div>
          <!-- ADD BTN -->
          <button
            @click="dialogueMarker = 'add'"
            class="flex gap-2 items-center px-2.5 py-1.5 rounded-xl border border-gray-300 cursor-pointer text-gray-100 dark:text-gray-950 bg-linear-to-l from-gray-800 via-blue-600 to-blue-800 dark:from-blue-300 dark:via-blue-100 dark:via-5% dark:to-blue-300"
          >
            <BookPlus class="size-4"></BookPlus>
            <div class="font-medium">Add Book</div>
          </button>
          <!-- ADD BTN -->
        </div>
        <!-- big written and add -->
      </div>
      <!-- Written and add -->
      <!-- info card -->
      <div class="flex flex-col md:flex-row w-full md:w-2/3 gap-3">
        <template v-for="card in selectionArr" :key="card.name">
          <div
            @click="tableShuffleFun(card)"
            :class="card.backColor"
            class="flex cursor-pointer items-center gap-3 px-2.5 py-1 rounded-xl w-full"
          >
            <!-- icon  -->
            <component
              class="size-7 md:size-9"
              :is="card.iconComponent"
            ></component>
            <!-- icon -->
            <!-- written and number -->
            <div class="flex flex-col">
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
    <!--------------------------------- TABLE AND SEARCH --------------------------->
    <div class="border flex flex-col gap-2">
      <!-- search -->
      <div
        class="flex flex-col md:flex-row relative justify-between items-center gap-1.5 px-2 py-1"
      >
        <input
          type="text"
          class="outline-none rounded pl-8 px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line"
          v-model="inputModel"
        />
        <DropDown
          class="border px-2 rounded cursor-pointer"
          :dropArr="searchSelectOptionArr"
          v-model="searchSelectedCat"
        ></DropDown>
        <Search class="absolute top-2 left-4 size-5"></Search>
      </div>
      <!-- search -->
      <div class="max-h-96 overflow-auto rounded scrollbar-thin scroll-smooth">
        <TableG
          :tableArr="allInOne"
          :actions="actions"
          v-model="selectedValueByTable"
          class="border rounded border-blue-500"
        >
          <!-- TABLE HEADING -->
          <template #tableHeadingSlot="{ tableKeys }">
            <tr
              class="sticky top-0 z-10 rounded-t-xl border-2 border-b-0 border-blue-300 dark:border-white text-gray-950 dark:text-gray-950 bg-blue-100"
            >
              <template v-for="tableHeading in tableKeys" :key="tableHeading">
                <th
                  class="px-2 truncate py-1 border-t border-blue-500"
                  v-if="tableHeading !== 'id' && tableHeading !== 'pic'"
                >
                  {{ formatLabel(tableHeading) }}
                </th>
              </template>
              <th class="border-t border-blue-500">Actions</th>
            </tr>
          </template>
          <!-- TABLE HEADING -->
          <!-- TABLE ROW -->
          <template #tableRowSlot="{ tableRow, actions }">
            <tr
              class="dark:border-white hover:bg-blue-500 hover:text-white dark:bg-blue-950 dark:text-white dark:hover:bg-blue-100 dark:hover:text-black transition-all duration-100"
            >
              <template
                v-for="(tableData, key) in tableRow"
                :key="tableData.id"
              >
                <td v-if="key !== 'id' && key !== 'pic'">
                  <div
                    class="px-4 py-2 border-t border-blue-900 text-center truncate"
                  >
                    {{ tableData }}
                  </div>
                </td>
              </template>
              <!-- Actions -->
              <td class="py-1 border-t border-blue-900">
                <div class="flex items-center gap-2">
                  <template v-for="action in actions" :key="action">
                    <component
                      @click="actionDecideFun(action, tableRow)"
                      class="cursor-pointer"
                      :is="action.iconShow"
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
    </div>
    <!--------------------------------- TABLE AND SEARCH --------------------------->
    <BookDialogue
      v-if="dialogueMarker !== ''"
      :dialogueMarker="dialogueMarker"
      :selectedObj="selectedObj"
      @hide="dialogueMarker = ''"
    ></BookDialogue>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import TableG from "./TableG.vue";
// import Accordion from "./Accordion.vue/index.js";
import DropDown from "./DropDown.vue";
import { useBookStore } from "../Stores/BookStore.js";
import {
  Edit,
  Image,
  Trash,
  BookPlus,
  BookOpen,
  BookCheck,
  BookAlert,
  Search,
} from "@lucide/vue";
import BookDialogue from "./BookDialogue.vue";

const booksFromStore = useBookStore();
// booksFromStore.books;
const selectedObj = ref({});

const dialogueMarker = ref("");

const actions = ref([
  { iconShow: Image, name: "pic" },
  { iconShow: Edit, name: "edit" },
  { iconShow: Trash, name: "delete" },
]);
const actionDecideFun = (action, tableRow) => {
  if (action.name !== "pic") {
    dialogueMarker.value = action.name;
  }
  selectedObj.value = tableRow;
};
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
const selectionArr = ref([
  {
    name: "All Books",
    arrLength: computed(() => booksFromStore.books.length),
    className: "text-blue-700  ",
    iconComponent: BookOpen,
    backColor:
      "bg-green-100 dark:bg-green-700  dark:text-green-300 text-green-700",
  },
  {
    name: "Available Books",
    arrLength: computed(
      () => booksFromStore.books.filter((i) => i.availableInStore > 0).length,
    ),
    className: "text-green-700 ",
    iconComponent: BookCheck,
    backColor:
      "bg-blue-100 dark:bg-blue-700  dark:text-blue-300 text-blue-700 ",
  },
  {
    name: "Borrowed Books",
    arrLength: computed(
      () => booksFromStore.books.filter((i) => i.availableInStore == 0).length,
    ),
    className: "text-red-700 ",
    iconComponent: BookAlert,
    backColor: "bg-red-100 dark:bg-red-700  dark:text-red-300 text-red-700 ",
  },
]);
const activeSelect = ref("All Books");
const tableShuffleFun = (card) => {
  activeSelect.value = card.name;
};
// search work here
const searchSelectOptionArr = ref(["Title", "Author", "Category"]);
const searchSelectedCat = ref("Title");
const inputModel = ref("");
// search work here
const allInOne = computed(() => {
  let arr = booksFromStore.books;

  // SEARCH BASED ON  TABLE SELECTION
  if (activeSelect.value == "Available Books") {
    arr = booksFromStore.books.filter((i) => i.availableInStore > 0);
  } else if (activeSelect.value == "Borrowed Books") {
    arr = booksFromStore.books.filter((i) => i.availableInStore !== i.stock);
  }
  // SEARCH BASED ON  TABLE SELECTION

  // SEARCH BASED ON DROP SELECTION
  if (inputModel.value.trim().toLowerCase() != "") {
    arr = booksFromStore.books.filter((book) =>
      book[searchSelectedCat.value.toLowerCase()]
        .toLowerCase()
        .includes(inputModel.value.toLowerCase()),
    );
  }
  // SEARCH BASED ON DROP SELECTION

  return arr;
});
console.log(activeSelect.value);
watch(allInOne, (n, o) => console.log(n));
</script>
