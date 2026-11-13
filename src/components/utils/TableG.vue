<template>
  <table class="w-full table-fixed border-collapse text-center">
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
      <tr>
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
                v-else-if="$slots.arrayOfObjectSlot && tData.arrayOfObjectSlot"
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
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  tableArr: Array,
  tableDesign: Array,
});
</script>
