<template>
  <div class="container-data">
    <div class="item-data" v-for="data in searchData.results" :key="data.id">
      <router-link
        :class="{ disabled: data.media_type === 'person' }"
        :to="{
          name:
            data.media_type === 'movies' ? 'MoviesDetails' : 'SerialsDetails',
          params: {
            id: data.id,
            category: data.media_type,
          },
        }"
      >
        <h3>{{ data.title ? data.title : noTitle }}</h3>
        <img :src="data.poster_path ? image + data.poster_path : noImg" />
      </router-link>
    </div>
  </div>
  <ThePagination
    :totalPages="searchData.total_pages"
    :perPage="searchData.results.length"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
  />
</template>

<script>
import ThePagination from "./ThePagination.vue";

export default {
  components: { ThePagination },
  props: {
    input: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchData: [],
      image: "https://image.tmdb.org/t/p/w500/",
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
      noTitle: "Missing Title",
      page: 1,
      currentPage: 1,
    };
  },
  watch: {
    input(value) {
      this.loadSearch(value);
    },
  },
  methods: {
    async loadSearch(page = this.currentPage) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&query=${this.input}&page=${page}`
        );
        if (!response.ok) throw Error;
        const resData = await response.json();
        this.searchData = resData;
        //console.log(resData.results);
      } catch (error) {
        console.log(error);
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      //console.log( this.currentPage);
      this.loadSearch(this.currentPage);
    },
  },
  created() {
    this.loadSearch();
  },
};
</script>

<style scoped>
.container-data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.item-data {
  width: 25%;
  background-color: #151f2e;
  border-radius: 10px;
  flex-basis: 25%;
  padding: 20px;
  margin: 5px;
  height: 550px;
}
.item-data img {
  width: 70%;
  height: 80%;
  border-radius: 10px;
}
a {
  text-decoration: none;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>