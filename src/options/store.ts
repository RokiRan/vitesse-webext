import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()

const useStore = defineStore('main', {
  // other options...
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
export { pinia, useStore }