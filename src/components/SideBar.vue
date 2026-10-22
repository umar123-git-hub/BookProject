<template>
  <Teleport to="#Tel">
    <div
      @click.self="sideBarModel = false"
      class="bg-gray-400/70 z-99 absolute inset-0 w-full"
    >
      <div
        class="w-max px-1 md:px-2 xl:px-3 py-1 h-full border-r bg-linear-to-r text-black dark:text-gray-100 from-white to-gray-200 dark:from-blue-950 dark:to-gray-900"
      >
        <!------------------ main content ---------------->
        <div class="flex flex-col gap-3 px-2">
          <!-- logo -->
          <div
            class="flex items-center gap-2 border-b border-gray-300 pt-2 pb-5"
          >
            <LibraryBig
              class="bg-linear-to-r dark:text-black text-gray-100 dark:from-white dark:to-gray-200 from-blue-950 to-gray-900 size-10 px-2 rounded-xl"
            ></LibraryBig>
            <div class="flex flex-col -gap-1">
              <div class="font-medium">TUT</div>
              <div class="text-xs">Library OS</div>
            </div>
          </div>
          <!-- logo -->
          <div class="flex flex-col gap-3">
            <template v-for="i in sideArr" :key="i.name">
              <div
                @click=""
                class="flex gap-3 transition-all duration-150 cursor-pointer items-center px-2 py-1 rounded-lg"
                :class="
                  variablesFromStore.routeSelect == i.name
                    ? ' border dark:border-blue-200 dark:bg-linear-to-r dark:from-blue-700 dark:to-gray-600'
                    : 'shadow-2xl border dark:text-black text-gray-100 dark:from-white dark:to-gray-200 bg-linear-to-r from-blue-900 to-gray-600 hover:from-blue-950 hover:to-gray-700 dark:hover:text-white'
                "
              >
                <component :is="i.iconComp"></component>
                <div>{{ i.name }}</div>
              </div>
            </template>
          </div>
        </div>
        <!------------------ main content ------  ---------->
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import {
  ArrowLeftRight,
  BookOpen,
  LayoutDashboard,
  LibraryBig,
  ReceiptIcon,
  User,
} from "@lucide/vue";
import { ref, Teleport } from "vue";
import { useRouter } from "vue-router";
// import { useVariableStore } from "../../store/variableStore";
// import { useVariableStore } from "../Store/variableStore";
const sideArr = ref([
  { name: "Dashboard", iconComp: LayoutDashboard },
  { name: "Books", iconComp: BookOpen },
  { name: "Members", iconComp: User },
  { name: "Publishers", iconComp: ReceiptIcon },
  { name: "Circulations", iconComp: ArrowLeftRight },
]);
const variablesFromStore = useVariableStore();
const routes = useRouter();
const sideBarModel = defineModel({ type: Boolean });
// const SelectFun = (i) => {
//   variablesFromStore.routeSelect = i.name;
//   sideBarModel.value = !sideBarModel.value;
//   console.log(variablesFromStore.routeSelect);
//   // changing routes
//   routes.push(variablesFromStore.routeSelect);
//   // changing routes
// };
</script>
