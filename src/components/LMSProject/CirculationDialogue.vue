<template>
  <div
    @click="$emit('hide')"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
  >
    <!------------- ABSOLUTE CONTENT AREA --------------------->
    <div
      @click.stop
      class="flex flex-col gap-3 bg-page w-max rounded absolute left-1/2 top-1/2 -translate-1/2 bg-gray-300 dark:bg-linear-to-l dark:from-blue-800 dark:to-cyan-600"
    >
      <!-- dia name and cross -->
      <div
        class="flex px-2 py-1 bg-green/30 dark:grad-header rounded-t justify-between items-center"
      >
        <div
          v-if="dialog == 'Add'"
          class="dark:text-main text-emerald-950 font-semibold text-lg"
        >
          Add Loan
        </div>
        <div
          v-else
          class="dark:text-main text-emerald-950 font-semibold text-lg"
        >
          Return Loan
        </div>

        <X
          @click="$emit('hide')"
          class="bg-green/70 hover:bg-green duration-150 transition-all text-emerald-950 cursor-pointer dark:grad-header dark:text-main rounded-xl p-0.5 size-5"
        ></X>
      </div>
      <!-- dia name and cross -->
      <!------------------ MAIN CONTENT -------------->
      <div class="grid grid-cols-1 sm:grid-cols-2 px-2 gap-3 bg-page">
        <!---------------- Accordion ---------------->
        <div v-if="dialog == 'Add'">
          <Accordion
            :AccordionData="booksFromStore.books"
            :fistDropKey="'category'"
            :secondDropKey="'title'"
            v-model="borrowBookObj.books"
          ></Accordion>
        </div>
        <!---------------- Accordion ---------------->

        <div v-if="!(dialog == 'Add')">{{ pBook.title }}</div>

        <div class="">
          <MultiSelect
            v-model="borrowBookObj.members"
            :multi-arr="membersFromStore.members"
          ></MultiSelect>
        </div>
        <!-- START DATE -->
        <div v-if="dialog == 'Add'">
          <VueDatePicker
            formats="MMMM DD, YYYY"
            auto-apply
            v-model="borrowBookObj.startDate"
            class="rounded border border-gray-700"
          ></VueDatePicker>
        </div>
        <!-- START DATE -->
        <!-- END DATE -->
        <div v-if="dialog == 'Add'">
          <VueDatePicker
            formats="MMMM DD, YYYY"
            auto-apply
            v-model="borrowBookObj.endDate"
            :min-date="borrowBookObj.startDate"
            class="rounded border border-gray-700"
          ></VueDatePicker>
        </div>
        <!-- END DATE -->
      </div>
      <!------------------ MAIN CONTENT -------------->

      <!-- RENT AND BUTTONS -->
      <div class="flex items-center justify-between">
        <div v-if="dialog == 'Add'" class="px-2 w-full">
          RENT : PKR({{ rent }})
        </div>
        <div class="flex gap-2 pb-2 justify-end items-center px-2 w-full">
          <button
            @click="$emit('hide')"
            class="cursor-pointer px-1 py-0.5 bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 duration-150 transition-all text-beige rounded"
          >
            Cancel
          </button>
          <button
            v-if="dialog == 'Add'"
            @click="addLoan()"
            class="cursor-pointer px-2 py-0.5 bg-green-600/70 hover:bg-green-400 duration-150 transition-all text-emerald-950 dark:text-main rounded"
          >
            Add
          </button>
          <button
            v-else
            @click="returnLoan()"
            class="cursor-pointer px-2 py-0.5 bg-green-600/70 hover:bg-green-400 duration-150 transition-all text-emerald-950 dark:text-main rounded"
          >
            return
          </button>
        </div>
      </div>

      <!-- RENT AND BUTTONS -->
    </div>
    <!------------- ABSOLUTE CONTENT AREA --------------------->
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { X } from "@lucide/vue";
import DropDown from "./DropDown.vue";
import Accordion from "./Accordion.vue";
// import Acc from "./Acc.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import MultiSelect from "./MultiSelect.vue";
// import { useBookStore } from "../Store/BookStore.js";
import { useBookStore } from "../Stores/BookStore.js";
import { useMemberStore } from "../Store/MemberStore.js";
import { useCirculationStore } from "../Stores/CirculationStore.js";
import { differenceInDays } from "date-fns";
const emits = defineEmits(["hide"]);
const booksFromStore = useBookStore();
const membersFromStore = useMemberStore();
const circulationFromStore = useCirculationStore();

// WORK OF ADDING prop
const props = defineProps({
  dialog: String,
  pBook: Object,
  loanForReturn: Object,
});
// WORK OF ADDING

///////////////// BORROWING BOOK WORK
const borrowBookObj = ref({
  books: {},
  members: [],
  startDate: null,
  endDate: null,
  fine: 0,
});
///////////////// BORROWING BOOK WORK

/////Accordion Work
// const selectedValue = ref({});
// const categoryAr = ref(
//   [...new Set(booksFromStore.books.map((i) => i.category))].map((cat) => {
//     return {
//       category: cat,
//       marker: false,
//       catBooks: booksFromStore.books.filter((o) => o.category == cat),
//     };
//     ``;
//   }),
// );
/////Accordion Work

const addLoan = () => {
  let obj = {
    books: borrowBookObj.value.books,
    members: borrowBookObj.value.members,
    startDate: borrowBookObj.value.startDate,
    endDate: borrowBookObj.value.endDate,
  };
  circulationFromStore.circulations.push(obj);

  membersFromStore.members.forEach((o) => {
    borrowBookObj.value.members.forEach((i) => {
      if (i.memberId == o.memberId) {
        o.borrowedBooks.push(borrowBookObj.value.books);
        booksFromStore.books.forEach((i) => {
          if (i.id == borrowBookObj.value.books.id) {
            i.availableInStore--;
          }
        });
      }
    });
  });
};
const rent = computed(() => {
  if (
    Object.keys(borrowBookObj.value.books).length == 0 ||
    borrowBookObj.value.startDate == null ||
    borrowBookObj.value.endDate == null
  ) {
    return 0;
  }
  let days = differenceInDays(
    borrowBookObj.value.endDate,
    borrowBookObj.value.startDate,
  );
  return days * borrowBookObj.value.books.rentPerDay;
});

///////// RETURN WORK
const returnLoan = () => {
  if (borrowBookObj.value.members.length == 0) {
    alert("Select Member");
  } else {
    borrowBookObj.value.members.forEach((member) => {
      membersFromStore.members.forEach((m) => {
        if (m.memberId === member.memberId) {
          // Remove returned book from member
          m.borrowedBooks = m.borrowedBooks.filter(
            (book) => book.id !== props.pBook.id,
          );
        }
      });
    });

    // Increase available book stock
    booksFromStore.books.forEach((book) => {
      if (book.id === props.pBook.id) {
        book.availableInStore++;
      }
    });

    circulationFromStore.circulations =
      circulationFromStore.circulations.filter(
        (i) => !(i.books == props.loanForReturn.books),
      );

    emits("hide");
  }
};
// const returnLoan = () => {
//   borrowBookObj.value.members.forEach((i) => {
//     membersFromStore.members.forEach((o) => {
//       if (o.memberId == i.memberId) {
//         o.borrowedBooks.filter((p) => {
//           if (p.id == props.pBook.id) {
//             booksFromStore.books.forEach((q) => {
//               if (q.id == props.pBook.id) {
//                 return false;
//               }
//             });
//           } else return true;
//         });
//       }
//     });
//   });
// };
///////// RETURN WORK
</script>
