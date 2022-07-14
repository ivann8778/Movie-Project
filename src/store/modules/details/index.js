export default {
  namespaced: true,
  state: {
    details: [],
    credits: [],
    similar: [],
    reviews: [],
    videos: [],
    image: [],
  },

  mutations: {
    SET_DATA(state, payload) {
      state[payload.key] = payload.data;
    },
  },
  actions: {
    async getDetails(context, payload) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    async getCredits(context, payload) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    async getSimilar(context, payload) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    async getReviews(context, payload) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    async getImages(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.category}/${payload.id}/images?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US`
        );
        if (!response.ok) throw Error;
        const resData = await response.json();
        if (payload.category === 'movie') {
          resData.category = 'movie';
        } else if (payload.category === 'tv') {
          resData.category = 'tv';
        }
        context.commit('SET_DATA', {
          key: 'images',
          data: resData.posters,
        });
        console.log(resData.posters);
      } catch (error) {
        //console.log(error);
      }
    },
    async getVideos(context, payload) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    async loadAllData({ dispatch }, payload) {
      try {
        const dataList = [
          await dispatch('getDetails', payload),
          await dispatch('getCredits', payload),
          await dispatch('getSimilar', payload),
          await dispatch('getReviews', payload),
          await dispatch('getVideos', payload),
          await dispatch('getImages', payload),
        ];
        return Promise.all(dataList);
      } catch (error) {
        console.log(error);
      }
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
    images(state) {
      return state.images;
    },
  },
};
