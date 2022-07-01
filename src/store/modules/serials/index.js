export default {
  namespaced: true,
  state: {
    serials: [],
    serialdetails: [],
    credits: [],
    similar: [],
    reviews: [],
  },

  mutations: {
    SET_SERIALS(state, serials) {
      state.serials = serials;
    },
    SET_SERIALDETAILS(state, payload) {
      state.serialdetails = payload;
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
    async getSerials(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407&page=1'
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const serial of resData.results) {
        serial.category = 'tv';
      }
      context.commit('SET_SERIALS', resData.results);
      //console.log(resData);
    },
    async getSerialDetails(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      context.commit('SET_SERIALDETAILS', resData);
      //console.log(resData);
    },
    async getCredits(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${payload.id}/credits?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const serial of resData) {
        serial.category = 'tv';
      }
      context.commit('SET_CREDITS', resData.cast);
      // console.log(resData.cast);
    },
    async getSimilar(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${payload.id}/similar?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const serial of resData) {
        serial.category = 'tv';
      }
      context.commit('SET_SIMILAR', resData.results);
      //console.log(resData.results);
    },
    async getReviews(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${payload.id}/reviews?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&page=1`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      for (const movie of resData.cast) {
        movie.category = 'tv';
      }
      context.commit('SET_REVIEWS', resData.results);
      //console.log(resData.results);
    },
  },

  getters: {
    serials(state) {
      return state.serials;
    },
    serialdetails(state) {
      return state.serialdetails;
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
