import { createRouter, createWebHistory } from 'vue-router'
import FlightsContainer from '../views/FlightsContainer.vue'

const routes = [
  {
    path: '/',
    name: 'FlightsContainer',
    component: FlightsContainer,
    redirect: '/departure',
    children: [
      {
        path: '/departure',
        name: 'departure',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/flights/FlightsDeparture.vue'
          )
      },
      {
        path: '/arrival',
        name: 'arrival',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/flights/FlightsArrival.vue'
          )
      },
      {
        path: '/:pathMatch(.*)',
        component: () =>
          import(/* webpackChunkName: "error" */ '../views/error/notFound')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
