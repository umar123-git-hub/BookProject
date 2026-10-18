import { ref } from "vue";
import { defineStore } from "pinia";

export const useBookStore = defineStore(
  "Book",
  () => {
    const books = ref([]);
    return { books };
  },
  {
    persist: true,
  },
);

// {
//   id: crypto.randomUUID(),
//   title: "Cosmos",
//   author: "Carl Sagan",
//   category: "Science",
//   publisher: "Random House",
//   availableInStore: 9,
//   stock: 9,
//   rentPerDay: 180,
//   pic: "https://covers.openlibrary.org/b/isbn/0345336892-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Midnight Library",
//   author: "Matt Haig",
//   category: "Fiction",
//   publisher: "Viking",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 150,
//   pic: "https://covers.openlibrary.org/b/isbn/0525559474-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "A Brief History of Time",
//   author: "Stephen Hawking",
//   category: "Science",
//   publisher: "Bantam Books",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 220,
//   pic: "https://covers.openlibrary.org/b/isbn/0553380168-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Educated",
//   author: "Tara Westover",
//   category: "Biography",
//   publisher: "Random House",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 160,
//   pic: "https://covers.openlibrary.org/b/isbn/0399590501-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Atomic Habits",
//   author: "James Clear",
//   category: "Self-Help",
//   publisher: "Avery",
//   availableInStore: 10,
//   stock: 10,
//   rentPerDay: 250,
//   pic: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Sapiens",
//   author: "Yuval Noah Harari",
//   category: "History",
//   publisher: "Harper",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 230,
//   pic: "https://covers.openlibrary.org/b/isbn/0062316095-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "1984",
//   author: "George Orwell",
//   category: "Fiction",
//   publisher: "Signet Classics",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 120,
//   pic: "https://covers.openlibrary.org/b/isbn/0451524934-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Lean Startup",
//   author: "Eric Ries",
//   category: "Non-Fiction",
//   publisher: "Crown Business",
//   availableInStore: 5,
//   stock: 5,
//   rentPerDay: 190,
//   pic: "https://covers.openlibrary.org/b/isbn/0307887898-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Deep Work",
//   author: "Cal Newport",
//   category: "Self-Help",
//   publisher: "Grand Central Publishing",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 210,
//   pic: "https://covers.openlibrary.org/b/isbn/1455586692-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Pragmatic Programmer",
//   author: "Andrew Hunt",
//   category: "Non-Fiction",
//   publisher: "Addison-Wesley",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 300,
//   pic: "https://covers.openlibrary.org/b/isbn/0135957052-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Zero to One",
//   author: "Peter Thiel",
//   category: "Non-Fiction",
//   publisher: "Crown Business",
//   availableInStore: 9,
//   stock: 9,
//   rentPerDay: 200,
//   pic: "https://covers.openlibrary.org/b/isbn/0804139296-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Power of Habit",
//   author: "Charles Duhigg",
//   category: "Self-Help",
//   publisher: "Random House",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 170,
//   pic: "https://covers.openlibrary.org/b/isbn/081298160X-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Clean Code",
//   author: "Robert Martin",
//   category: "Non-Fiction",
//   publisher: "Prentice Hall",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 280,
//   pic: "https://covers.openlibrary.org/b/isbn/0132350882-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Hobbit",
//   author: "J.R.R. Tolkien",
//   category: "Fiction",
//   publisher: "Mariner Books",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 180,
//   pic: "https://covers.openlibrary.org/b/isbn/054792822X-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Harry Potter and the Sorcerer's Stone",
//   author: "J.K. Rowling",
//   category: "Fiction",
//   publisher: "Scholastic",
//   availableInStore: 10,
//   stock: 10,
//   rentPerDay: 250,
//   pic: "https://covers.openlibrary.org/b/isbn/059035342X-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Rich Dad Poor Dad",
//   author: "Robert Kiyosaki",
//   category: "Non-Fiction",
//   publisher: "Plata Publishing",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 160,
//   pic: "https://covers.openlibrary.org/b/isbn/0446677450-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Think and Grow Rich",
//   author: "Napoleon Hill",
//   category: "Self-Help",
//   publisher: "Free Press",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 130,
//   pic: "https://covers.openlibrary.org/b/isbn/1585424331-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Art of War",
//   author: "Sun Tzu",
//   category: "History",
//   publisher: "Shambhala",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 100,
//   pic: "https://covers.openlibrary.org/b/isbn/1590302257-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Steve Jobs",
//   author: "Walter Isaacson",
//   category: "Biography",
//   publisher: "Simon & Schuster",
//   availableInStore: 5,
//   stock: 5,
//   rentPerDay: 240,
//   pic: "https://covers.openlibrary.org/b/isbn/1451648537-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Long Walk to Freedom",
//   author: "Nelson Mandela",
//   category: "Biography",
//   publisher: "Little, Brown and Company",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 170,
//   pic: "https://covers.openlibrary.org/b/isbn/0316548189-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Diary of a Young Girl",
//   author: "Anne Frank",
//   category: "Biography",
//   publisher: "Bantam",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 110,
//   pic: "https://covers.openlibrary.org/b/isbn/0553296984-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Immortal Life of Henrietta Lacks",
//   author: "Rebecca Skloot",
//   category: "Non-Fiction",
//   publisher: "Crown Publishing",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 190,
//   pic: "https://covers.openlibrary.org/b/isbn/1400052181-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Pride and Prejudice",
//   author: "Jane Austen",
//   category: "Fiction",
//   publisher: "Penguin Classics",
//   availableInStore: 9,
//   stock: 9,
//   rentPerDay: 140,
//   pic: "https://covers.openlibrary.org/b/isbn/0141439513-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The 7 Habits of Highly Effective People",
//   author: "Stephen Covey",
//   category: "Self-Help",
//   publisher: "Simon & Schuster",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 220,
//   pic: "https://covers.openlibrary.org/b/isbn/1982137274-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Dune",
//   author: "Frank Herbert",
//   category: "Fiction",
//   publisher: "Ace Books",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 260,
//   pic: "https://covers.openlibrary.org/b/isbn/0441172717-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Martian",
//   author: "Andy Weir",
//   category: "Science",
//   publisher: "Crown Publishing",
//   availableInStore: 5,
//   stock: 5,
//   rentPerDay: 200,
//   pic: "https://covers.openlibrary.org/b/isbn/0804139024-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Intelligent Investor",
//   author: "Benjamin Graham",
//   category: "Non-Fiction",
//   publisher: "Harper Business",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 290,
//   pic: "https://covers.openlibrary.org/b/isbn/0060555661-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "Ikigai",
//   author: "Hector Garcia",
//   category: "Self-Help",
//   publisher: "Penguin Books",
//   availableInStore: 9,
//   stock: 9,
//   rentPerDay: 150,
//   pic: "https://covers.openlibrary.org/b/isbn/0143130722-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Wright Brothers",
//   author: "David McCullough",
//   category: "Biography",
//   publisher: "Simon & Schuster",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 180,
//   pic: "https://covers.openlibrary.org/b/isbn/1476793241-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Odyssey",
//   author: "Homer",
//   category: "Fiction",
//   publisher: "Penguin Classics",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 130,
//   pic: "https://covers.openlibrary.org/b/isbn/0140268863-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Story of Civilization",
//   author: "Will Durant",
//   category: "History",
//   publisher: "Simon & Schuster",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 270,
//   pic: "https://covers.openlibrary.org/b/isbn/1567310124-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "To Kill a Mockingbird",
//   author: "Harper Lee",
//   category: "Fiction",
//   publisher: "Harper Perennial",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 150,
//   pic: "https://covers.openlibrary.org/b/isbn/0061120081-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Kite Runner",
//   author: "Khaled Hosseini",
//   category: "Fiction",
//   publisher: "Riverhead Books",
//   availableInStore: 7,
//   stock: 7,
//   rentPerDay: 190,
//   pic: "https://covers.openlibrary.org/b/isbn/159463193X-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The Selfish Gene",
//   author: "Richard Dawkins",
//   category: "Science",
//   publisher: "Oxford University Press",
//   availableInStore: 6,
//   stock: 6,
//   rentPerDay: 240,
//   pic: "https://covers.openlibrary.org/b/isbn/0198788606-L.jpg"
// },
// {
//   id: crypto.randomUUID(),
//   title: "The 48 Laws of Power",
//   author: "Robert Greene",
//   category: "Self-Help",
//   publisher: "Penguin Books",
//   availableInStore: 8,
//   stock: 8,
//   rentPerDay: 230,
//   pic: "https://covers.openlibrary.org/b/isbn/0140280197-L.jpg"
// }
