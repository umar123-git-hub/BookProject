<template>
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <template
          v-for="thead in tableKeys"
          :key="thead"
        >
          <th>{{ formatLabel(thead) }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="tableRow in tableArr"
        :key="tableRow"
      >
        <tr>
          <template
            v-for="(tableData, i) in tableRow"
            :key="i"
          >
            <td>{{ tableData }}</td>
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
});

const selectedValueByTable = defineModel({ type: Object });

const formatLabel = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const tableKeys = ref(Object.keys(props.tableArr[0]));
</script>
