<template>
  <div class="bg-gray-100/70 h-screen w-max">
    <div
      class="flex flex-col gap-4 w-max px-1 md:px-2 xl:px-3 py-2 h-full border-r bg-linear-to-r text-black from-white to-gray-200"
    >
      <div>
        <!-- WRITTEN AND LOGO -->
        <div class="flex items-center justify-center gap-1.5">
          <Check
            class="size-7 md:size-8 p-1 bg-blue-600 text-white rounded-lg font-semibold"
          ></Check>
          <h2 class="text-xl font-semibold">TaskFlow</h2>
        </div>
        <!-- WRITTEN AND LOGO -->
      </div>
      <!------------------ main content ---------------->
      <div class="flex flex-col gap-3 px-2">
        <!-- logo -->
        <div class="flex flex-col gap-3">
          <template v-for="i in sideArr" :key="i.name">
            <div
              @click=""
              class="flex gap-3 transition-all duration-150 cursor-pointer items-center px-2 py-1 rounded-lg shadow-2xl bg-white hover:scale-115"
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
</template>
<script setup>
import {
  ArrowLeftRight,
  BookOpen,
  CalendarClockIcon,
  Check,
  FolderClockIcon,
  LayoutDashboard,
  LibraryBig,
  ReceiptIcon,
  Settings,
  Summary,
  User,
} from "@lucide/vue";
import { ref, Teleport } from "vue";
import { useRouter } from "vue-router";
// import { useVariableStore } from "../../store/variableStore";
// import { useVariableStore } from "../Store/variableStore";
const sideArr = ref([
  { name: "Dashboard", iconComp: LayoutDashboard },
  { name: "My Tasks", iconComp: Summary },
  { name: "Today", iconComp: CalendarClockIcon },
  { name: "Projects", iconComp: FolderClockIcon },
  { name: "Settings ", iconComp: Settings },
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
