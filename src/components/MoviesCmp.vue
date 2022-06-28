<template>
  MOVIES
  <div v-for="movie in movies" :key="movie.id">
    <h2>{{ movie.original_title }}</h2>
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesCmp",

  computed: {
    ...mapGetters("getMovies", ["movies"]),
  },
  methods: {
    ...mapActions("getMovies", ["getMovies"]),
  },
  created() {
    this.getMovies();
  },
};
</script>
