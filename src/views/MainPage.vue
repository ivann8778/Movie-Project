<template>
  <now-playing></now-playing>
  <movies-cmp></movies-cmp>
  <serials-cmp></serials-cmp>
</template>

<script>
import NowPlaying from "../components/NowPlaying.vue";
import MoviesCmp from "../components/MoviesCmp.vue";
import SerialsCmp from "../components/SerialsCmp.vue";

export default {
  components: {
    NowPlaying,
    MoviesCmp,
    SerialsCmp,
  },
};
</script>

<style>
</style>
