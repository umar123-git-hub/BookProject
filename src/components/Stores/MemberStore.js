import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore(
  "member",
  () => {
    const members = ref([
      
    ]);

    return {
      members,
    };
  },
  {
    persist: true,
  },
);



// {
//     name: "Ali Raza",
//     memberId: "M1",
//     borrowedBooks: 2,
//     email: "ali.raza@gmail.com",
//     phoneNumber: "031234567",
//     premium: false,
//   },
//   {
//     name: "Ayesha Khan",
//     memberId: "M2",
//     borrowedBooks: 1,
//     email: "ayesha.khan@yahoo.com",
//     phoneNumber: "03111234567",
//     premium: true,
//   },
//   {
//     name: "Hamza Ahmed",
//     memberId: "M3",
//     borrowedBooks: 4,
//     email: "hamza.ahmed@outlook.com",
//     phoneNumber: "03221234567",
//     premium: false,
//   },
//   {
//     name: "Sara Malik",
//     memberId: "M4",
//     borrowedBooks: 0,
//     email: "sara.malik@gmail.com",
//     phoneNumber: "03331234567",
//     premium: false,
//   },
//   {
//     name: "Usman Ali",
//     memberId: "M5",
//     borrowedBooks: 3,
//     email: "usman.ali@hotmail.com",
//     phoneNumber: "03441234567",
//     premium: true,
//   },
//   {
//     name: "Hassan Shah",
//     memberId: "M6",
//     borrowedBooks: 5,
//     email: "hassan.shah@gmail.com",
//     phoneNumber: "03551234567",
//     premium: false,
//   },
//   {
//     name: "Zainab Noor",
//     memberId: "M7",
//     borrowedBooks: 2,
//     email: "zainab.noor@yahoo.com",
//     phoneNumber: "03661234567",
//     premium: false,
//   },
//   {
//     name: "Bilal Ahmed",
//     memberId: "M8",
//     borrowedBooks: 1,
//     email: "bilal.ahmed@outlook.com",
//     phoneNumber: "03771234567",
//     premium: true,
//   },
//   {
//     name: "Fatima Zahra",
//     memberId: "M9",
//     borrowedBooks: 3,
//     email: "fatima.zahra@gmail.com",
//     phoneNumber: "03881234567",
//     premium: false,
//   },
//   {
//     name: "Omer Farooq",
//     memberId: "M10",
//     borrowedBooks: 0,
//     email: "omer.farooq@hotmail.com",
//     phoneNumber: "03991234567",
//     premium: false,
//   },
//   {
//     name: "Hira Aslam",
//     memberId: "M11",
//     borrowedBooks: 2,
//     email: "hira.aslam@yahoo.com",
//     phoneNumber: "03012345678",
//     premium: true,
//   },
//   {
//     name: "Danish Khan",
//     memberId: "M12",
//     borrowedBooks: 4,
//     email: "danish.khan@gmail.com",
//     phoneNumber: "03122345678",
//     premium: false,
//   },
//   {
//     name: "Mahnoor Ali",
//     memberId: "M13",
//     borrowedBooks: 1,
//     email: "mahnoor.ali@outlook.com",
//     phoneNumber: "03232345678",
//     premium: true,
//   },
//   {
//     name: "Saad Hassan",
//     memberId: "M14",
//     borrowedBooks: 3,
//     email: "saad.hassan@gmail.com",
//     phoneNumber: "03342345678",
//     premium: false,
//   },
//   {
//     name: "Maham Tariq",
//     memberId: "M15",
//     borrowedBooks: 0,
//     email: "maham.tariq@yahoo.com",
//     phoneNumber: "03452345678",
//     premium: true,
//   },
//   {
//     name: "Arham Malik",
//     memberId: "M16",
//     borrowedBooks: 5,
//     email: "arham.malik@hotmail.com",
//     phoneNumber: "03562345678",
//     premium: false,
//   },
//   {
//     name: "Laiba Ahmed",
//     memberId: "M17",
//     borrowedBooks: 2,
//     email: "laiba.ahmed@gmail.com",
//     phoneNumber: "03672345678",
//     premium: false,
//   },
//   {
//     name: "Talha Iqbal",
//     memberId: "M18",
//     borrowedBooks: 1,
//     email: "talha.iqbal@outlook.com",
//     phoneNumber: "03782345678",
//     premium: false,
//   },
//   {
//     name: "Iqra Javed",
//     memberId: "M19",
//     borrowedBooks: 4,
//     email: "iqra.javed@yahoo.com",
//     phoneNumber: "03892345678",
//     premium: true,
//   },
//   {
//     name: "Rayyan Asif",
//     memberId: "M20",
//     borrowedBooks: 2,
//     email: "rayyan.asif@gmail.com",
//     phoneNumber: "03902345678",
//     premium: false,
//   },