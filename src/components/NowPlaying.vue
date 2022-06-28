<template>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="movie in nowplaying" class="slide" :key="movie.id">
        <div class="container">
          <router-link to="/details/:id">
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

    <div class="carousel-buttons">
      <button @click="previous">
        <i class="arrow left"></i>
      </button>
      <button @click="next">
        <i class="arrow right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NowPlaying",

  computed: {
    ...mapGetters("getMovies", ["nowplaying"]),
  },
  methods: {
    ...mapActions("getMovies", ["getNowPlaying"]),
    next() {
      const first = this.nowplaying.shift();
      this.nowplaying = this.nowplaying.concat(first);
    },
    previous() {
      const last = this.nowplaying.pop();
      this.nowplaying = [last].concat(this.nowplaying);
    },
    kur() {
      console.log("kur");
    },
  },
  created() {
    this.getNowPlaying();
  },
};
</script>

<style scoped>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: right;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 25em;
}
img {
  border-radius: 10px;
  width: 700px;
  height: 300px;
}
.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
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
.carousel-buttons {
  text-align: right;
}

button {
  border: none;
  margin: 10px;
  background: transparent;
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