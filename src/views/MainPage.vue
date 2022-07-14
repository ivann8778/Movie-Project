<template>
  <NowPlaying />
  <TopRated category="movies" />
  <TopRated category="serials" />
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
