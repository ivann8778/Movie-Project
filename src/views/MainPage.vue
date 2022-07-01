<template>
  <now-playing></now-playing>
  <movies-cmp></movies-cmp>
  <serials-cmp></serials-cmp>
  <!-- <top-rated type="movie"></top-rated>
  <top-rated type="serial"></top-rated> -->
</template>

<script>
import NowPlaying from "../components/NowPlaying.vue";
import MoviesCmp from "../components/MoviesCmp.vue";
import SerialsCmp from "../components/SerialsCmp.vue";
// import TopRated from "../components/TopRated.vue";

export default {
  components: {
    NowPlaying,
    MoviesCmp,
    SerialsCmp,
    // TopRated,
  },
};
</script>

<style>
</style>
