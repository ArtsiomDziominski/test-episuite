import { createRouter, createWebHistory } from 'vue-router'
import Results from '../views/Results.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { path: '/results', query: { cas: '002921-88-2' } }
      }
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    }
  ]
})

export default router
