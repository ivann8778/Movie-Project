import { createStore } from 'vuex';
import movies from './modules/movies/index.js';
import serials from './modules/serials/index.js';
import details from './modules/details/index.js';

export default createStore({
  modules: {
    movies: movies,
    serials: serials,
    details: details,
  },
});
