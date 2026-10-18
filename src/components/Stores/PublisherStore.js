import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useBookStore } from './BookStore'


export const usePublisherStore = defineStore('publisher', () => {
  const books = useBookStore()
  const allPublisher = computed(() => [...new Set(books.books.map((book) => book.publisher))])
  const publisher = computed(() => allPublisher.value)
  
  return {publisher}
}, {
  persist: true
})