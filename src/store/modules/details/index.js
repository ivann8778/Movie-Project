export default {
  namespaced: true,
  state: {
    details: [],
    credits: [],
    similar: [],
    reviews: [],
    videos: [],
  },

  mutations: {
    SET_DATA(state, payload) {
      state[payload.key] = payload.data;
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
      context.commit('SET_DATA', {
        key: 'details',
        data: resData,
      });
      //console.log('details', resData);
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
      context.commit('SET_DATA', {
        key: 'credits',
        data: resData.cast,
      });
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
      context.commit('SET_DATA', {
        key: 'similar',
        data: resData.results,
      });
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
      context.commit('SET_DATA', {
        key: 'reviews',
        data: resData.results,
      });
      //console.log(resData.results);
    },
    async getVideos(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.category}/${payload.id}/videos?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      if (payload.category === 'movie') {
        resData.category = 'movie';
      } else if (payload.category === 'tv') {
        resData.category = 'tv';
      }
      context.commit('SET_DATA', {
        key: 'videos',
        data: resData.results,
      });
      //console.log(resData.results);
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
    videos(state) {
      return state.videos;
    },
  },
};
