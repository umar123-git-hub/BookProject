<template>
  <div class="bg-gray-400/70 h-screen w-max">
    <div
      class="w-max px-1 md:px-2 xl:px-3 py-1 h-full border-r bg-linear-to-r text-black dark:text-gray-100 from-white to-gray-200 dark:from-blue-950 dark:to-gray-900"
    >
      <!------------------ main content ---------------->
      <div class="flex flex-col gap-3 px-2">
        <!-- logo -->
        <div class="flex flex-col gap-3">
          <template v-for="i in sideArr" :key="i.name">
            <div
              @click=""
              class="flex gap-3 transition-all duration-150 cursor-pointer items-center px-2 py-1 rounded-lg"
            >
              <component :is="i.iconComp"></component>
              <div>{{ i.name }}</div>
            </div>
          </template>
        </div>
      </div>
      <!------------------ main content ------  ---------->
    </div>
    <!------------------ main content ------  ---------->
  </div>
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
// const variablesFromStore = useVariableStore();
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
