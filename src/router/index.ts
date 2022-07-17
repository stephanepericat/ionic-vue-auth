import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, Router } from 'vue-router';
// import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';

import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/home',
//     name: 'Home',
//     component: HomePage
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: ProfilePage,
//     beforeEnter: createAuthGuard(),
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
export default (app: App) : Router => {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      // beforeEnter: createAuthGuard(app),
      beforeEnter: (to, from, next) => {
        next();
      }
    }
  ]
  
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
}