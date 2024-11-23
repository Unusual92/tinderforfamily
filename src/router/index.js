import { createRouter, createWebHistory } from 'vue-router';
import Family from '../components/Family.vue';
import AddFamilyMember from '../components/AddFamilyMember.vue';
import Events from '../components/Events.vue';
import CreateEvent from '../components/CreateEvent.vue';
import CreateFamily from '../components/CreateFamily.vue';

const routes = [
  {
    path: '/family',
    name: 'Family',
    component: Family
  },
  {
    path: '/add-family-member',
    name: 'AddFamilyMember',
    component: AddFamilyMember
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/create-family',
    name: 'CreateFamily',
    component: CreateFamily
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
