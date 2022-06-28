<template>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="movie in array" class="slide" :key="movie.id">
        <div class="container">
          <router-link
            :to="{ name: 'MoviesDetails', params: { id: movie.id } }"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
            />
          </router-link>
          <div class="bottom-left">
            <h2>{{ movie.title }}</h2>
            <h5>Release date: {{ movie.release_date }}</h5>
            <h5>Original language: {{ movie.original_language }}</h5>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NowPlaying",
  data() {
    return {
      array: [],
    };
  },

  computed: {
    ...mapGetters("getMovies", ["nowplaying"]),
  },
  methods: {
    ...mapActions("getMovies", ["getNowPlaying"]),
  },
  created() {
    this.getNowPlaying();
    setTimeout(() => {
      this.array = this.nowplaying;
    }, 500);
  },
  mounted() {
    setInterval(() => {
      const first = this.array.shift();
      this.array = this.array.concat(first);
    }, 2000);
  },
};
</script>

<style scoped>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 25em;
}
img {
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #0286f3;
}
.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
.arrow {
  border: solid rgb(255, 255, 255);
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.container {
  position: relative;
  text-align: center;
  color: white;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 50px;
  left: 16px;
  color: #eeeeee;
  text-align: left;
  font: normal normal normal 26px/31px SF Pro Text;
}
</style>