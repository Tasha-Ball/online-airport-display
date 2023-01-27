import { createRouter, createWebHistory } from 'vue-router'
import FlightsContainer from '../views/FlightsContainer.vue'
import { setAdmin, removeAdmin, isAuth } from '@/helpers/useUser.js'

const routes = [
  {
    path: '/',
    name: 'dashboard',
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
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () =>
      import(/* webpackChunkName: "error" */ '../views/error/notFound')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const checkQuery = 'user' in to.query && to.query.user === 'admin'
  if (checkQuery) {
    if (isAuth()) return next()
    else {
      const answer = window.confirm('Confirm administrator rights')
      if (answer) {
        setAdmin(answer)
        return next()
      } else {
        next(from)
      }
    }
  } else {
    if (!isAuth()) return next()
    else {
      const answer = window.confirm('Confirm exit')
      if (answer) {
        removeAdmin()
        return next()
      } else {
        next({ query: { user: 'admin' } })
      }
    }
  }
})

export default router
