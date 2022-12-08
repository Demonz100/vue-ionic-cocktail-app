import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/randomTab'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/randomTab'
      },
      {
        path: 'randomTab',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'searchTab',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'drink-by-ingredient/:name',
        component: () => import('@/views/DrinkByIngredient.vue')
      },
      {
        path: 'drink-by-ingredient/drink-detail/:id',
        component: () => import('@/views/DrinkDetail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
