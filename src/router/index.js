import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import TheDetails from '../views/TheDetails.vue';
import SearchList from '../components/SearchList.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/movie/:id/',
    name: 'MoviesDetails',
    component: TheDetails,
    props: true,
  },
  {
    path: '/tv/:id/',
    name: 'SerialsDetails',
    component: TheDetails,
    props: true,
  },
  {
    path: '/search/:input/',
    name: 'Search',
    component: SearchList,
    props: true,
  },
  { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
