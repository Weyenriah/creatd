import { createRouter, createWebHistory } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';

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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-projects',
      name: 'my-projects',
      component: () => import('../views/app/UserProjectsView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/upload',
      name: 'upload-project',
      component: () => import('../views/app/CreateProjectView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth0();
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router
