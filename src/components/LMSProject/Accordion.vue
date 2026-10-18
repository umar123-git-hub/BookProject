<template>
  <!----------------------- MainDiv ------------------------->
  <div class="relative">
    <!----------------------- AccordionBtn ------------------------->
    <div @click="showDropdownFun">
      <div
        class="flex gap-1 p-2 cursor-pointer transition-all duration-300 border border-gray-50/0 hover:border-emerald-500/20 shadow-sm hover:shadow-sm shadow-black/40 dark:shadow-emerald-200 rounded-xl items-center justify-between"
      >
        <div class="text-sm text-gray-900 w-full">
          {{
            Object.keys(selectedValue) == 0
              ? "Select Book"
              : selectedValue[secondDropKey]
          }}
        </div>
        <ChevronDown
          :class="showDropdown ? 'rotate-180' : 'rotate-0'"
          class="size-5 text-gray-900 transition-all duration-300"
        />
      </div>
    </div>
    <!----------------------- AccordionBtn ------------------------->
    <!----------------------- AccordionDropdown ------------------------->
    <Transition name="mainDrop">
      <div
        v-if="showDropdown"
        class="absolute flex flex-col top-[110%] h-[700%] overflow-auto transition-all origin-top duration-500 shadow-4xl px-2 py-2 rounded-xl w-full z-20"
      >
        <template v-for="val in categoryAr" :key="val.fistDropKey">
          <div
            @click="markerFun(val)"
            class="hover:bg-emerald-50 px-3 py-2.5 text-emerald-950 dark:hover:text-gray-900 rounded-xl cursor-pointer flex justify-between"
          >
            <div class="text-sm font-medium">
              {{ val.fistDropKey }}
            </div>
            <ChevronDown
              :class="val.marker ? 'rotate-180' : 'rotate-0'"
              class="size-4 duration-300"
            />
          </div>
          <!------------- DeepDropDown -------------->
          <Transition name="deepTransition">
            <div
              v-if="val.marker"
              class="bg-gray-100 flex flex-col gap-1 px-2 py-1"
            >
              <template v-for="deepVal in val.group" :key="deepVal.id">
                <div
                  @click="
                    selectedValue = deepVal;
                    showDropdown = false;
                  "
                  class="px-2 py-2 cursor-pointer border-l text-gray-600 hover:text-emerald-950 hover:bg-emerald-100 text-sm"
                >
                  {{ deepVal[secondDropKey] }}
                </div>
              </template>
            </div>
          </Transition>
          <!------------- DeepDropDown -------------->
        </template>
      </div>
    </Transition>
    <!----------------------- AccordionDropdown ------------------------->
  </div>
  <!----------------------- MainDiv ------------------------->
</template>

<script setup>
import { ChevronDown } from "@lucide/vue";
import { ref } from "vue";

const props = defineProps({
  AccordionData: Array,
  fistDropKey: String,
  secondDropKey: String,
});
const showDropdown = ref(false);
const selectedValue = defineModel({ type: Object });

const showDropdownFun = () => {
  showDropdown.value = !showDropdown.value;
  categoryAr.value.forEach((i) => (i.marker = false));
};

const markerFun = (val) => {
  let wasMarker = val.marker;
  categoryAr.value.forEach((i) => (i.marker = false));
  val.marker = wasMarker;
  categoryAr.value.forEach((o) =>
    o.fistDropKey == val.fistDropKey
      ? (o.marker = !o.marker)
      : (o.marker = false),
  );
  console.log(val.marker);
};

/////Accordion Work
const categoryAr = ref(
  [...new Set(props.AccordionData.map((i) => i[props.fistDropKey]))].map(
    (item) => {
      return {
        fistDropKey: item,
        marker: false,
        group: props.AccordionData.filter((o) => o[props.fistDropKey] == item),
      };
    },
  ),
);
/////Accordion Work
console.log(props.secondDropKey);
</script>
<style scoped>
.mainDrop-enter-active,
.mainDrop-leave-active {
  transition: all 0.5s ease;
}

.mainDrop-enter-from,
.mainDrop-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
.deepTransition-enter-active,
.deepTransition-leave-active {
  transition: all 0.3s ease-in-out;
  /* transform: translateY(0px); */
}

.deepTransition-enter-from,
.deepTransition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
