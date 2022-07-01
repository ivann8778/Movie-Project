export default {
  namespaced: true,
  state: {
    details: [],
    credits: [],
    similar: [],
    reviews: [],
  },

  mutations: {
    SET_DETAILS(state, payload) {
      state.details = payload;
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
    async getDetails(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.category}/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      if (payload.category === 'movie') {
        resData.category = 'movie';
      } else if (payload.category === 'tv') {
        resData.category = 'tv';
      }
      context.commit('SET_DETAILS', resData);
      //   console.log('details', resData.results);
    },
    async getCredits(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.category}/${payload.id}/credits?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      if (payload.category === 'movie') {
        resData.category = 'movie';
      } else if (payload.category === 'tv') {
        resData.category = 'tv';
      }
      context.commit('SET_CREDITS', resData.cast);
      //console.log(resData.cast);
    },
    async getSimilar(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.category}/${payload.id}/similar?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      if (payload.category === 'movie') {
        resData.category = 'movie';
      } else if (payload.category === 'tv') {
        resData.category = 'tv';
      }
      context.commit('SET_SIMILAR', resData.results);
      //console.log('asdasd', resData.results);
    },
    async getReviews(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.category}/${payload.id}/reviews?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      if (payload.category === 'movie') {
        resData.category = 'movie';
      } else if (payload.category === 'tv') {
        resData.category = 'tv';
      }
      context.commit('SET_REVIEWS', resData.results);
      console.log('asdasd', resData.results);
    },
  },

  getters: {
    details(state) {
      return state.details;
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
