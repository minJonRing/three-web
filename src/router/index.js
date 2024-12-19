import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/list.vue'
import ItemView from '../views/item.vue'
import EChartsView from '../views/echarts/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'List',
    meta: {
      load: true
    },
    component: ListView
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: ItemView
  },
  {
    path: '/e-charts',
    name: 'EChartsView',
    component: EChartsView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
