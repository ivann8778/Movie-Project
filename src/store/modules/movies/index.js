export default {
  namespaced: true,
  state: {
    movies: [],
    nowplaying: [],
    nowplayingmoviedetails: [],
    credits: [],
    similar: [],
    reviews: [],
  },

  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_NOWPLAYING(state, nowplaying) {
      state.nowplaying = nowplaying;
    },
    SET_NOWPLAYINGMOVIEDETAILS(state, payload) {
      state.nowplayingmoviedetails = payload;
    },
    SET_CREDITS(state, payload) {
      state.credits = payload;
    },
    SET_SIMILAR(state, payload) {
      state.similar = payload;
    },
    SET_REVIEWS(state, payload) {
      state.reviews = payload;
    },
  },
  actions: {
    async getMovies(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407&page=1'
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.results) {
        movie.category = 'movie';
      }
      context.commit('SET_MOVIES', resData.results);
      //console.log(resData.results);
    },
    async getNowPlaying(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=7074bb722049de6c4c14dd7d06db2407&page=1'
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.results) {
        movie.category = 'movie';
      }
      context.commit('SET_NOWPLAYING', resData.results);
      //console.log(resData.results);
    },
    async getNowPlayingMovieDetails(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();

      context.commit('SET_NOWPLAYINGMOVIEDETAILS', resData);
      //console.log(resData.results);
    },
    async getCredits(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${payload.id}/credits?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.cast) {
        movie.category = 'movie';
      }
      context.commit('SET_CREDITS', resData.cast);
      //console.log(resData.cast);
    },
    async getSimilar(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${payload.id}/similar?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.cast) {
        movie.category = 'movie';
      }
      context.commit('SET_SIMILAR', resData.results);
      //console.log(resData.results);
    },
    async getReviews(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${payload.id}/reviews?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.cast) {
        movie.category = 'movie';
      }
      context.commit('SET_REVIEWS', resData.results);
      //console.log(resData.results);
    },
  },

  getters: {
    movies(state) {
      return state.movies;
    },
    nowplaying(state) {
      return state.nowplaying;
    },
    nowplayingmoviedetails(state) {
      return state.nowplayingmoviedetails;
    },
    credits(state) {
      return state.credits;
    },
    similar(state) {
      return state.similar;
    },
    reviews(state) {
      return state.reviews;
    },
  },
};
