import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import MoviesDetails from '../views/MoviesDetails.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/movie/:id',
    name: 'MoviesDetails',
    component: MoviesDetails,
    props: true,
  },
  { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
