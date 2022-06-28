import { createStore } from 'vuex';
import movies from './modules/movies/index.js';
import serials from './modules/serials/index.js';

export default createStore({
  modules: { getMovies: movies, getSerials: serials },
});
