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
            Members Management
          </div>
        </div>
        <!-- written and logo -->
        <!-- big written and add -->
        <div class="flex justify-between w-full items-center">
          <div
            class="font-bold text-4xl bg-linear-to-r from-blue-950 to-gray-700 bg-clip-text text-transparent dark:text-white"
          >
            MEMBERS
          </div>
          <!-- ADD BTN -->
          <button
            @click="dialogueMarker = 'add'"
            class="flex gap-2 items-center px-2.5 py-1.5 rounded-xl border border-gray-300 cursor-pointer bg-linear-to-r from-blue-700 to-gray-700 dark:from-white dark:to-gray-100"
          >
            <BookPlus class="size-4"></BookPlus>
            <div class="font-medium">Member Book</div>
          </button>
          <!-- ADD BTN -->
        </div>
        <!-- big written and add -->
      </div>
      <!-- Written and add -->
      <!-- info card -->
      <div class="flex flex-col md:flex-row w-full md:w-1/2 gap-3">
        <template v-for="card in exArr" :key="card.name">
          <div
            @click="tableShuffleFun(card)"
            :class="card.backColor"
            class="flex items-center gap-3 px-2.5 py-1 rounded-xl w-full"
          >
            <!-- icon  -->
            <component
              class="size-7 md:size-9"
              :class="card.iconColor"
              :is="card.iconComp"
            ></component>
            <!-- icon -->
            <!-- written and number -->
            <div class="flex flex-col text-beige dark:text-emerald-800">
              <div class="text-xs font-medium">{{ card.name }}</div>
              <div class="text-lg font-semibold">{{ card.arrLength }}</div>
            </div>
          </div>

          <!-- written and number -->
        </template>
      </div>
      <!-- info card -->
    </div>
    <!--------------------------------- TABLE AND SEARCH --------------------------->
    <div class="border flex flex-col gap-2">
      <!-- search -->
      <div
        class="flex flex-col md:flex-row relative justify-between items-center gap-1.5 px-2 py-1"
      >
        <input
          type="text"
          class="outline-none rounded pl-8 px-1 py-0.5 md:py-1.5 w-full border dark:border-gray-100 dark:text-gray-100"
          v-model="inputModel"
        />
        <DropDown
          class="border px-2 rounded cursor-pointer"
          :dropArr="searchSelectOptionArr"
          v-model="searchSelectedCat"
        >
          <!-- SELECTED AREA -->
          <template
            #dropSelectShow="{ dropPanelShow, selectedDrop, toggleDropdown }"
          >
            <div
              @click="toggleDropdown"
              class="flex justify-between border dark:text-gray-100 py-1 rounded px-2 items-center"
            >
              <div>{{ formatLabel(selectedDrop) || "Please Select" }}</div>

              <ChevronDown
                :class="dropPanelShow ? 'rotate-180' : 'rotate-0'"
                class="size-5 transition-all duration-300"
              />
            </div>
          </template>

          <!-- DROPDOWN OPTIONS -->
          <template #dropsPanel="{ drop, selectDrop }">
            <div
              @click="selectDrop(drop)"
              class="px-2 py-1 hover:bg-blue-100 hover:text-gray-900 text-gray-800 dark:text-gray-100 cursor-pointer"
            >
              {{ formatLabel(drop) }}
            </div>
          </template>
        </DropDown>
        <Search
          class="absolute dark:text-gray-100 top-2 md:top-3 left-4 size-5"
        ></Search>
      </div>
      <!-- search -->
      <div class="max-h-96 overflow-auto rounded scrollbar-thin scroll-smooth">
        <TableG
          :tableArr="allInOne"
          :actions="actions"
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
                    v-if="!(typeof tableData == typeof true)"
                    class="px-4 py-2 border-t border-blue-900 text-center truncate"
                  >
                    {{
                      typeof tableData == typeof ""
                        ? tableData
                        : Array.isArray(tableData)
                          ? tableData.length
                          : typeof tableData == typeof true
                            ? ""
                            : tableData
                    }}
                  </div>
                  <div
                    v-else
                    class="px-4 py-2 border-t border-blue-900 text-center truncate"
                    :class="[tableData ? 'text-yellow-300' : 'text-gray-500']"
                  >
                    <Gem></Gem>
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
    <MembersDialogue
      v-if="dialogueMarker !== ''"
      :dialogueMarker="dialogueMarker"
      :selectedObj="selectedObj"
      @hide="dialogueMarker = ''"
    ></MembersDialogue>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import TableG from "./TableG.vue";
import { useMemberStore } from "../Stores/MemberStore.js";
import {
  Edit,
  Trash,
  BookOpen,
  BookPlus,
  UserGroup,
  Search,
  ChevronDown,
  Gem,
} from "@lucide/vue";
import MembersDialogue from "./MembersDialogue.vue";
import DropDown from "./DropDown.vue";
const membersFromStore = useMemberStore();
const selectedObj = ref({});

const dialogueMarker = ref("");

const actions = ref([
  { iconShow: Edit, name: "edit" },
  { iconShow: Trash, name: "delete" },
]);
const actionDecideFun = (action, tableRow) => {
  if (action.name !== "pic") {
    dialogueMarker.value = action.name;
  }
  selectedObj.value = tableRow;
};
const exArr = ref([
  {
    name: "All Members",
    iconComp: UserGroup,
    arrLength: computed(() => membersFromStore.members.length),
    iconColor: " dark:text-emerald-800 text-emerald-200",
    backColor:
      "bg-linear-to-tr from-emerald-800 to-green dark:bg-linear-to-tl dark:from-beige  dark:to-green",
  },

  {
    name: "Premium Members",
    iconComp: Gem,
    arrLength: computed(
      () => membersFromStore.members.filter((i) => i.premium).length,
    ),
    iconColor: "dark:text-yellow-700 text-yellow-300/80",
    backColor:
      "bg-linear-to-tr from-yellow-800 via-yellow-400 to-orange-300 dark:bg-linear-to-tl dark:from-yellow-200 dark:via-orange-400 dark:to-yellow-500",
  },
]);
const activeSelect = ref("All Members");

const tableShuffleFun = (card) => {
  activeSelect.value = card.name;
};

const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};
// search work here
const searchSelectOptionArr = ref(["name", "email", "phoneNumber"]);

const searchSelectedCat = ref("Name");
const inputModel = ref("");
// search work here
const allInOne = computed(() => {
  let arr = membersFromStore.members;

  // SEARCH BASED ON  TABLE SELECTION
  if (activeSelect.value == "Premium Members") {
    arr = membersFromStore.members.filter((i) => i.premium);
  }
  // SEARCH BASED ON  TABLE SELECTION

  // SEARCH BASED ON DROP SELECTION
  if (inputModel.value.trim().toLowerCase() != "") {
    arr = membersFromStore.members.filter((book) =>
      book[searchSelectedCat.value.toLowerCase()]
        .toLowerCase()
        .includes(inputModel.value.toLowerCase()),
    );
  }
  // SEARCH BASED ON D  ROP SELECTION

  return arr;
});
</script>
