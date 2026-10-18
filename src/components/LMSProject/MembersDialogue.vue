<template>
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
          Member
        </div>

        <X
          @click="$emit('hide')"
          class="bg-green/70 hover:bg-green duration-150 transition-all text-emerald-950 cursor-pointer dark:grad-header dark:text-main rounded-xl p-0.5 size-5"
        ></X>
      </div>
      <!-- dia name and cross -->

      <!------------------ MAIN CONTENT -------------->
      <div
        v-if="dialogueMarker !== 'delete'"
        class="grid grid-cols-1 sm:grid-cols-2 px-2 gap-3 bg-page"
      >
        <label class="flex flex-col text-main">
          <div class="text-sm">Name :</div>
          <input
            class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
            type="text"
            v-model="memberToAddObj.name"
          />
        </label>

        <label class="flex flex-col text-main">
          <div class="text-sm">Email :</div>
          <input
            class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
            type="text"
            v-model="memberToAddObj.email"
          />
        </label>

        <label class="flex flex-col relative text-main">
          <div class="text-sm">ID :</div>
          <input
            class="outline-none px-5 py-0.5 cursor-not-allowed w-full border border-muted focus:ring focus:ring-line rounded"
            type="number"
            disabled
            v-model="memberToAddObj.memberId"
          />
          <div class="absolute top-1/2 -translate-y-0.5 left-1">M</div>
        </label>

        <label class="flex flex-col text-main">
          <div class="text-sm">Phone Number :</div>
          <input
            class="outline-none px-1 py-0.5 w-full border border-muted focus:ring focus:ring-line rounded"
            type="text"
            placeholder="03---------"
            v-model="memberToAddObj.phoneNumber"
          />
        </label>

        <div v-if="true" class="flex flex-col text-main gap-2">
          <div class="text-sm flex gap-1">
            Premium :
            <Gem
              :class="
                memberToAddObj.premium
                  ? 'text-yellow-400 dark:text-yellow-600'
                  : 'text-gray-500 dark:text-stone-400'
              "
            ></Gem>
          </div>
          <div class="flex gap-2 border border-muted px-2 w-max">
            <button
              type="button"
              @click="memberToAddObj.premium = false"
              class="cursor-pointer"
              :class="[memberToAddObj.premium ? '' : 'text-red-400']"
            >
              No
            </button>
            <div>/</div>
            <button
              type="button"
              @click="memberToAddObj.premium = true"
              class="cursor-pointer"
              :class="[memberToAddObj.premium ? 'text-green-400' : '']"
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div v-else class="px-2 flex flex-col gap-2">
        <div class="text-xl font-semibold">Are You Sure To Delete?</div>
        <div class="flex items-center gap-2">
          <ArrowBigRightDash class="text-red-500 size-5"></ArrowBigRightDash>
          <div>{{ selectedObj.name }}</div>
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
          class="px-12 py-4 rounded-lg z-99 absolute top-2 left-2 bg-gray-100 text-base"
        >
          {{ toastMsg }}
        </div>
      </Teleport>
    </Transition>
  </div>
</template>

<script setup>
import { ArrowBigRightDash, Gem, X } from "@lucide/vue";
import { useMemberStore } from "../Stores/MemberStore.js";
import { ref, Transition, watch } from "vue";
import { useCirculationStore } from "../Stores/CirculationStore.js";

const emits = defineEmits(["hide"]);
const props = defineProps({
  dialogueMarker: {
    String,
    default: () => "",
  },
  selectedObj: {
    Object,
    default: () => ({}),
  },
});

// watch(
//   () => props.selectedObj,
//   (n, o) => {
//     console.log("new ch", n);
//     console.log("old ch", o);
//   },
// );
// const CirculationStore = useCirculationStore();
const membersFromStore = useMemberStore();
const biggestID = Math.max(
  ...membersFromStore.members.map((i) => i.memberId.slice(1)),
);
const memberToAddObj = ref({
  name: "",
  email: "",
  memberId: biggestID + 1,
  phoneNumber: "",
  premium: false,
});

const toastMsg = ref("");

////////////////////////////////// REG EX
const nameReg = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneReg = /^03\d{9}$/; // 03XXXXXXXXX (11 digits)
// Agar +92 format bhi chahiye: /^(?:03\d{9}|\+923\d{9})$/
////////////////////////////////// REG EX

///////////////////////////////////////// TOAST
let toastTimer;
const showToast = (msg) => {
  clearTimeout(toastTimer);
  toastMsg.value = msg;
  toastTimer = setTimeout(() => (toastMsg.value = ""), 3000);
};
///////////////////////////////////////// TOAST

// ---------- VALIDATION ----------
const rules = [
  {
    field: "name",
    label: "Name",
    regex: nameReg,
    hint: "letters only, min 2 characters",
  },
  {
    field: "email",
    label: "Email",
    regex: emailReg,
    hint: "e.g. ali@gmail.com",
  },
  {
    field: "phoneNumber",
    label: "Phone Number",
    regex: phoneReg,
    hint: "format: 03XXXXXXXXX must be 11 Digits",
  },
];

const validateMember = () => {
  const member = memberToAddObj.value;

  for (const { field, label, regex, hint } of rules) {
    const value = String(member[field] ?? "").trim();
    if (!value) return `${label} is required`;
    if (!regex.test(value)) return `Invalid ${label} (${hint})`;
  }

  if (member.name.trim().length < 2)
    return "Name must be at least 2 characters";

  const id = Number(member.memberId);
  if (!Number.isInteger(id) || id < 1)
    return "ID must be a whole number of at least 1";

  return ""; // empty = valid
};

//////////////////////////////////////////////// HELPERS
const capitalizeWords = (str) => {
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
};

const resetMember = () => {
  memberToAddObj.value = {
    name: "",
    email: "",
    memberId: biggestID + 1,
    phoneNumber: "",
    premium: false,
  };
};

//////////////////////////////////////////////// ADD
const addConfirm = () => {
  const error = validateMember();
  if (error) return showToast(error);

  const obj = {
    name: capitalizeWords(memberToAddObj.value.name),
    memberId: "M" + Number(memberToAddObj.value.memberId),
    borrowedBooks: 0,
    email: memberToAddObj.value.email.trim().toLowerCase(),
    phoneNumber: memberToAddObj.value.phoneNumber.trim(),
    premium: memberToAddObj.value.premium,
  };

  membersFromStore.members.push(obj);
  resetMember();
  emits("hide");
};

//////////////////////////////////////////////// EDIT
if (
  props.dialogueMarker == "edit" &&
  Object.keys(props.selectedObj).length !== 0
) {
  2;
  const { name, email, memberId, phoneNumber, premium } = props.selectedObj;
  Object.assign(memberToAddObj.value, {
    name,
    email,
    memberId,
    phoneNumber,
    premium: premium ?? false,
  });
  memberToAddObj.value.memberId = Number(
    memberToAddObj.value.memberId.slice(1),
  );
}

const editConfirm = () => {
  const error = validateMember();
  if (error) return showToast(error);

  const member = membersFromStore.members.find(
    (i) => i.memberId === props.selectedObj.memberId,
  );
  if (!member) return showToast("Member not found");

  member.name = capitalizeWords(memberToAddObj.value.name);
  member.email = memberToAddObj.value.email.trim().toLowerCase();
  member.phoneNumber = memberToAddObj.value.phoneNumber.trim();
  member.memberId = "M" + Number(memberToAddObj.value.memberId);

  emits("hide");
};

//////////////////////////////////////////////// DELETE
const deleteConfirm = () => {
  membersFromStore.members = membersFromStore.members.filter(
    (i) => i.memberId !== props.selectedObj.memberId,
  );
  emits("hide");
};
</script>

<style scoped>
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
