<template>
  <h1>{{ movie.original_title }}</h1>
  <img :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`" />
</template>

<script>
export default {
  props: ["id"],
  // computed: {
  //   movie() {
  // return this.$store.getters["getMovies/nowplaying"].find(
  //   (movie) => movie.id === this.$route.params.id
  // );
  //   },
  // },
  computed: {
    movieId() {
      return parseInt(this.$route.params.id);
    },
    movie() {
      return this.$store.getters["getMovies/nowplaying"].find(
        (movie) => movie.id === this.movieId
      );
    },
  },
};
</script>

<style>
</style>