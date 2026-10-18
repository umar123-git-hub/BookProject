<template>
  <Teleport to="#Tel">
    <div
      @click="$emit('hide')"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
    >
      <!------------- ABSOLUTE CONTENT AREA --------------------->
      <div
        @click.stop
        class="flex flex-col gap-3 bg-gray-100 rounded absolute left-1/2 top-1/2 -translate-1/2"
      >
        <!-- dia name and cross -->
        <div
          class="flex px-2 py-1 bg-green-300/30 dark:grad-header rounded-t justify-between items-center"
        >
          <div class="dark:text-main text-emerald-950 font-semibold text-lg">
            {{ capitalizeWords(dialogueMarker) }}
            Book
          </div>

          <X
            @click="$emit('hide')"
            class="bg-emerald-400/60 hover:bg-emerald-200/0 border border-amber-100/0 hover:border-emerald-950 duration-150 transition-all text-emerald-950 cursor-pointer dark:grad-header dark:text-main rounded-xl p-0.5 size-5"
          ></X>
        </div>
        <!-- dia name and cross -->
        <!------------------ MAIN CONTENT -------------->
        <div
          v-if="dialogueMarker !== 'delete'"
          class="grid grid-cols-1 sm:grid-cols-2 px-2 gap-3 bg-page"
        >
          <label class="flex flex-col text-main">
            <div class="text-sm">Title :</div>
            <input
              placeholder=""
              class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
              type="text"
              v-model="bookToAddObj.title"
            />
          </label>

          <label class="flex flex-col text-main">
            <div class="text-sm">Author :</div>
            <input
              class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
              type="text"
              v-model="bookToAddObj.author"
            />
          </label>
          <label class="flex flex-col relative text-main">
            <div class="text-sm">Category :</div>
            <Transition name="dropChange" mode="out-in">
              <DropDown
                v-if="localCat != 'Other'"
                :drop-arr="catsArr"
                @other="catAssign"
                class="outline-none cursor-pointer px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
                v-model="bookToAddObj.category"
              ></DropDown>
              <div v-else>
                <input
                  class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
                  type="text"
                  v-model="bookToAddObj.category"
                />
                <SortAscIcon
                  @click="localCat = ''"
                  class="absolute right-1 top-1 cursor-pointer rotate-180 size-4"
                />
              </div>
            </Transition>
          </label>
          <label class="flex relative flex-col text-main">
            <div class="text-sm">Publisher :</div>
            <Transition name="dropChange" mode="out-in">
              <DropDown
                v-if="localPub != 'Other'"
                :drop-arr="pubsArr"
                @other="pubAssign"
                class="outline-none cursor-pointer px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
                v-model="bookToAddObj.publisher"
              ></DropDown>
              <div v-else>
                <input
                  class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
                  type="text"
                  v-model="bookToAddObj.publisher"
                />
                <SortAscIcon
                  @click="localPub = ''"
                  class="absolute right-1 top-1 cursor-pointer rotate-180 size-4"
                />
              </div>
            </Transition>
          </label>
          <label class="flex flex-col text-main">
            <div class="text-sm">Stock :</div>
            <input
              class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
              type="number"
              min="1"
              v-model="bookToAddObj.stock"
            />
          </label>
          <label class="flex flex-col text-main">
            <div class="text-sm">
              Rent <span class="text-main text-xs">(PKR)</span> :
            </div>
            <input
              class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
              type="number"
              v-model="bookToAddObj.rentPerDay"
            />
          </label>
          <label v-if="false" class="flex flex-col text-main">
            <div class="text-sm">pic</div>
            <input
              class="outline-none hidden px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
              type="file"
              min="50"
            />
            <Upload
              class="size-5 outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
            ></Upload>
          </label>
        </div>
        <div v-else class="px-2 flex flex-col gap-2">
          <div class="text-xl font-semibold">Are You Sure To Delete?</div>
          <div class="flex items-center gap-2">
            <ArrowBigRightDash class="text-red-500 size-5"></ArrowBigRightDash>
            <div>{{ selectedObj.title }}</div>
          </div>
        </div>
        <!------------------ MAIN CONTENT -------------->
        <!-- BUTTONS SELF END -->
        <div class="flex gap-2 pb-2 items-center px-2 self-end">
          <button
            @click="$emit('hide')"
            class="cursor-pointer px-1 py-0.5 bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 duration-150 transition-all text-beige rounded"
          >
            Cancel
          </button>
          <button
            @click="
              dialogueMarker == 'add'
                ? addConfirm()
                : dialogueMarker == 'edit'
                  ? editConfirm()
                  : deleteConfirm()
            "
            :class="
              dialogueMarker == 'delete'
                ? 'text-red-800 border border-red-500 bg-red-200 hover:bg-red-800 hover:text-red-200      '
                : 'bg-emerald-300/80 hover:bg-emerald-300  duration-150 transition-all text-emerald-950  '
            "
            class="cursor-pointer px-2 py-0.5 rounded"
          >
            {{ capitalizeWords(dialogueMarker) }}
          </button>
        </div>
        <!-- BUTTONS SELF END -->
      </div>
      <!------------- ABSOLUTE CONTENT AREA --------------------->
      <Transition name="toastTransition">
        <Teleport to="#Tel">
          <div
            v-if="toastMsg != ''"
            class="px-12 py-4 rounded-lg z-99 absolute top-2 left-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-100 text-base"
          >
            {{ toastMsg }}
          </div>
        </Teleport>
      </Transition>
    </div>
  </Teleport>
</template>
<script setup>
import { ArrowBigRightDash, SortAscIcon, Upload, X } from "@lucide/vue";
import DropDown from "./DropDown.vue";
import { useBookStore } from "../Stores/BookStore.js";
import { useCatsStore } from "../Stores/catStore.js";
import { usePublisherStore } from "../Stores/PublisherStore.js";
import { ref, Teleport, Transition, watch } from "vue";
const emits = defineEmits(["hide"]);
const props = defineProps({
  dialogueMarker: {
    String,
    default: () => "",
  },
  selectedObj: {
    Object,
    default: () => {},
  },
});

const booksFromStore = useBookStore();
// CATS FROM STORE
const catsFromStore = useCatsStore();
const catsArr = ref([...catsFromStore.cats]);
const localCat = ref("");
catsArr.value.push("Other");
const catAssign = (drop) => {
  localCat.value = drop;
};
// CATS FROM STORE
// PUBS FROM STORE
const pubsFormStore = usePublisherStore();
const pubsArr = ref([...pubsFormStore.publisher]);
const localPub = ref("");
pubsArr.value.push("Other");
const pubAssign = (drop) => {
  localPub.value = drop;
};
// PUBS FROM STORE
//  OTHER ASSIGN
// watch(bookToAddObj.value)
const bookToAddObj = ref({
  title: "",
  author: "",
  category: "",
  publisher: "",
  stock: 1,
  rentPerDay: 50,
  pic: "",
});
//  OTHER ASSIGN
const toastMsg = ref("");
////////////////////////////////// REG EX
// Title: unchanged (also accepts the curly apostrophe ’ that phones/keyboards often type)
const titleReg = /^[A-Za-z0-9][A-Za-z0-9 :,'’!?&().-]{1,99}$/;

// Author: allows initials with dots ("J.K. Rowling", "J.R.R. Tolkien"), hyphens, apostrophes, and a trailing dot ("Jr.")
const authorReg = /^[A-Za-z]+(?:(?:\.\s?|[ '’-])[A-Za-z]+)*\.?$/;

// Category: unchanged
const categoryReg = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Publisher: allows " & ", ", ", ".", hyphens, apostrophes, optional (parentheses), trailing dot ("Inc.")
const publisherReg =
  /^\(?[A-Za-z0-9]+\)?(?:(?: *[&,.] *|[ '’-])\(?[A-Za-z0-9]+\)?)*\.?$/;
////////////////////////////////// REG EX

///////////////////////////////////////// ERROR WORK
let toastTimer;
const showToast = (msg) => {
  clearTimeout(toastTimer);
  toastMsg.value = msg;
  toastTimer = setTimeout(() => (toastMsg.value = ""), 3000);
};
// ---------- VALIDATION ----------
const rules = [
  {
    field: "title",
    label: "Title",
    regex: titleReg,
    hint: "2-100 characters, letters/numbers only",
  },
  { field: "author", label: "Author", regex: authorReg, hint: "letters only" },
  {
    field: "category",
    label: "Category",
    regex: categoryReg,
    hint: "letters only",
  },
  {
    field: "publisher",
    label: "Publisher",
    regex: publisherReg,
    hint: "letters/numbers only",
  },
];

const validateBook = () => {
  const book = bookToAddObj.value;

  // 1. Empty + regex checks for text fields
  for (const { field, label, regex, hint } of rules) {
    const value = String(book[field]).trim();

    if (!value) return `${label} is required`;
    if (!regex.test(value)) return `Invalid ${label} (${hint})`;
  }

  // 2. Number checks
  const stock = Number(book.stock);
  const rent = Number(book.rentPerDay);

  if (!Number.isInteger(stock) || stock < 1)
    return "Stock must be a whole number of at least 1";
  if (!Number.isFinite(rent) || rent < 50)
    return "Rent must be at least 50 PKR";

  return ""; // empty string = valid
};

// ///////////////////////////////////////ERROR WORK

//////////////////////////////////////////////// WORK OF ADDING
const resetBooks = () => {
  bookToAddObj.value.title = "";
  bookToAddObj.value.author = "";
  bookToAddObj.value.category = "";
  bookToAddObj.value.publisher = "";
  bookToAddObj.value.stock = 1;
  bookToAddObj.value.rentPerDay = 50;
  bookToAddObj.value.pic = "";
};
const capitalizeWords = (str) => {
  return str
    .trim()
    .split(/\s+/) // handles multiple spaces like "ali   khan"
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
};
const addConfirm = () => {
  const error = validateBook();
  if (error) return showToast(error);
  let obj = {
    id: crypto.randomUUID(),
    title: capitalizeWords(bookToAddObj.value.title),
    author: capitalizeWords(bookToAddObj.value.author),
    category: capitalizeWords(bookToAddObj.value.category),
    publisher: capitalizeWords(bookToAddObj.value.publisher),
    availableInStore: Number(bookToAddObj.value.stock),
    stock: Number(bookToAddObj.value.stock),
    rentPerDay: Number(bookToAddObj.value.rentPerDay),
    pic: "",
  };
  booksFromStore.books.push(obj);
  resetBooks();
  emits("hide");
};
////////////////////////////////////////// WORK OF ADDING

///////////////////////////////////////////////// EDIT WORK
if (
  props.dialogueMarker == "edit" &&
  Object.keys(props.selectedObj).length != 0
) {
  const { title, author, category, publisher, stock, rentPerDay, pic } =
    props.selectedObj;
  Object.assign(bookToAddObj.value, {
    title,
    author,
    category,
    publisher,
    stock,
    rentPerDay,
    pic: pic ?? "",
  });
}

const editConfirm = () => {
  const error = validateBook();
  if (error) return showToast(error);

  const book = booksFromStore.books.find((i) => i.id === props.selectedObj.id);
  if (!book) return showToast("Book not found");

  const newStock = Number(bookToAddObj.value.stock);
  const stockDiff = newStock - book.stock;

  book.title = capitalizeWords(bookToAddObj.value.title);
  book.author = capitalizeWords(bookToAddObj.value.author);
  book.category = capitalizeWords(bookToAddObj.value.category);
  book.publisher = capitalizeWords(bookToAddObj.value.publisher);
  book.rentPerDay = Number(bookToAddObj.value.rentPerDay);
  book.availableInStore = Math.max(0, book.availableInStore + stockDiff);
  book.stock = newStock;

  emits("hide");
};
///////////////////////////////////////////////// EDIT WORK

// DELETE WORK
const deleteConfirm = () => {
  booksFromStore.books = booksFromStore.books.filter(
    (i) => i.id !== props.selectedObj.id,
  );

  emits("hide");
};
// DELETE WORK
</script>
<style scoped>
.dropChange-enter-active,
.dropChange-leave-active {
  transition: all 0.8s ease;
}

.dropChange-enter-from,
.dropChange-leave-to {
  opacity: 0;
  transform: translate(100px, 0px);
}
.toastTransition-enter-active,
.toastTransition-leave-active {
  transition: all 0.8s ease;
}

.toastTransition-enter-from,
.toastTransition-leave-to {
  opacity: 0;
  transform: translate(100px, 0px);
}
</style>
