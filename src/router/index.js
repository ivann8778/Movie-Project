import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import TheDetails from '../views/TheDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: TheDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
