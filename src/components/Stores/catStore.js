import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useBookStore } from './BookStore'


export const useCatsStore = defineStore('cats', () => {
  const books = useBookStore()
  const allcats = computed(() => [...new Set(books.books.map((book) => book.category))])
  const cats = computed(() => allcats.value)
  
  return {cats}
}, {
  persist: true
})