<template>
  <div class="container-data">
    <div class="item-data" v-for="data in searchData" :key="data.id">
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
        <img :src="data.poster_path ? imgPath + data.poster_path : noImg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input"],
  data() {
    return {
      searchData: [],
      imgPath: "https://image.tmdb.org/t/p/w500/",
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
      noTitle: "Missing Title",
    };
  },
  methods: {
    async loadSearch() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=7074bb722049de6c4c14dd7d06db2407&language=en-US&query=${this.input}`
      );
      if (!response.ok) throw Error;
      const resData = await response.json();
      this.searchData = resData.results;
      //console.log(resData.results);
    },
  },
  created() {
    this.loadSearch();
  },
  updated() {
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