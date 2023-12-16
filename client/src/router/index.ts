import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/marketing/LandingView.vue'),
    },
    {
      path: '/dashboard',
      name: 'home',
      component: () => import('../views/app/HomeView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/my-projects',
      name: 'my-projects',
      component: () => import('../views/app/UserProjectsView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/upload',
      name: 'upload-project',
      component: () => import('../views/app/CreateProjectView.vue'),
      beforeEnter: authGuard,
    }
  ]
})

export default router
