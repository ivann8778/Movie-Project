export default {
  namespaced: true,
  state: {
    serials: [],
  },

  mutations: {
    SET_SERIALS(state, serials) {
      state.serials = serials;
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
  },

  getters: {
    serials(state) {
      return state.serials;
    },
  },
};
