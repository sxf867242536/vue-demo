import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from './../views/Film.vue'
import Cinema from './../views/Cinema.vue'
import Center from './../views/Center.vue'
import Nowplaying from './../views/film/Nowplaying.vue'
import Comingsoon from './../views/film/Comingsoon.vue'
import Detail from './../views/Detail.vue'
import City from './../views/City.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail/:myid',
    component: Detail
  },
  {
    path: '/login',
    component: () => import('./../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const auth = ['/center']
  if (auth.includes(to.fullPath)) {
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
