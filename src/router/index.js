import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Family from '../components/Family.vue';
import AddFamilyMember from '../components/AddFamilyMember.vue';
import Events from '../components/Events.vue';
import CreateEvent from '../components/CreateEvent.vue';
import CreateFamily from '../components/CreateFamily.vue';
import store from '../Store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/family',
    name: 'Family',
    component: Family,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-family-member',
    name: 'AddFamilyMember',
    component: AddFamilyMember,
    meta: { requiresAuth: true }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-family',
    name: 'CreateFamily',
    component: CreateFamily,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;