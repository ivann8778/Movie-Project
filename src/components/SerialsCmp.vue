<template>
  ---------------------------------------------------------------------------------------------------TV
  SERIALS
  <div v-for="serial in serials" :key="serial.id">
    <h2>{{ serial.name }}</h2>
    <img :src="`https://image.tmdb.org/t/p/w500/${serial.poster_path}`" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SeriesCmp",
  computed: {
    ...mapGetters("getSerials", ["serials"]),
  },
  methods: {
    ...mapActions("getSerials", ["getSerials"]),
  },
  created() {
    this.getSerials();
  },
};
</script>
