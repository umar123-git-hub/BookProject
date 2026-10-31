<template>
  <table class="w-full border-separate border-spacing-0 lg:w-full">
    <slot
      name="tableColsSlot"
      v-if="$slots.tableColsSlot"
      :table-keys="tableKeys"
    ></slot>
    <colgroup v-else>
      <template v-for="tableHeading in tableKeys" :key="tableHeading">
        <col class="min-w-40" />
      </template>
    </colgroup>
    <thead>
      <slot
        name="tableHeadingSlot"
        v-if="$slots.tableHeadingSlot"
        :table-keys="tableKeys"
      ></slot>
      <tr v-else>
        <template v-for="tableHeading in tableKeys" :key="tableHeading">
          <th v-if="tableHeading !== 'id'">{{ formatLabel(tableHeading) }}</th>
        </template>
      </tr>
    </thead>
    <tbody class="">
      <template v-for="tableRow in tableArr" :key="tableRow.id">
        <slot
          name="tableRowSlot"
          v-if="$slots.tableRowSlot"
          :table-row="tableRow"
          :actions="actions"
        >
        </slot>
        <tr v-else>
          <template v-for="(TableData, key) in tableRow">
            <td v-if="key !== 'id'">{{ TableData }}</td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps({
  tableArr: {
    Array,
    default: () => [
      {
        head: "data",
        head1: "data",
        head2: "data",
      },
    ],
  },
  actions: Array,
});

const selectedValueByTable = defineModel({ type: Object });

const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const tableKeys = computed(() => {
  if (props.tableArr.length == 0) {
    let arr = Object.keys({
      head: "data",
      head1: "data",
      head2: "data",
    });
    return arr;
  } else {
    return Object.keys(props.tableArr[0]);
  }
});
</script>
