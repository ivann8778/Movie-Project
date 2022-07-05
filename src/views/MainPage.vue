<template>
  <NowPlaying />
  <TopRated
    category="movies"
    getters="getMovies/movies"
    actions="getMovies/getMovies"
  />
  <TopRated
    category="serials"
    getters="getSerials/serials"
    actions="getSerials/getSerials"
  />
</template>

<script>
import NowPlaying from "../components/NowPlaying.vue";
import TopRated from "../components/TopRated.vue";

export default {
  components: {
    NowPlaying,
    TopRated,
  },
};
</script>
