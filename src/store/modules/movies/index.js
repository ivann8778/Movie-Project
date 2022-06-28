export default {
  namespaced: true,
  state: {
    movies: [],
    nowplaying: [],
  },

  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_NOWPLAYING(state, nowplaying) {
      state.nowplaying = nowplaying;
    },
  },
  actions: {
    async getMovies(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407&page=1'
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      context.commit('SET_MOVIES', resData.results);
      //console.log(resData);
    },
    async getNowPlaying(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=7074bb722049de6c4c14dd7d06db2407&page=1'
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      context.commit('SET_NOWPLAYING', resData.results);
      //console.log(resData);
    },
  },

  getters: {
    movies(state) {
      return state.movies;
    },
    nowplaying(state) {
      return state.nowplaying;
    },
  },
};
