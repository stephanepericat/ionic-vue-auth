import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, Router } from 'vue-router';
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';

import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';

export default (app: App) : Router => {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      beforeEnter: createAuthGuard(app),
    }
  ]
  
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
}
