<template>
  <h2>Top Rated Serials</h2>
  <div class="carousel-buttons">
    <button @click="previous">
      <i class="arrow left"></i>
    </button>
    <button @click="next">
      <i class="arrow right"></i>
    </button>
  </div>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="movie in array" class="slide" :key="movie.id">
        <div class="container">
          <router-link
            :to="{
              name: 'SerialsDetails',
              params: {
                id: movie.id,
                category: movie.category,
                sort: movie.sort,
              },
            }"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </router-link>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesCmp",
  data() {
    return {
      array: [],
    };
  },

  computed: {
    ...mapGetters("getSerials", ["serials"]),
  },
  methods: {
    ...mapActions("getSerials", ["getSerials"]),
    next() {
      const first = this.array.shift();
      this.array = this.array.concat(first);
    },
    previous() {
      const last = this.array.pop();
      this.array = [last].concat(this.array);
    },
  },
  created() {
    this.getSerials();
    setTimeout(() => {
      this.array = this.serials;
    }, 500);
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
  width: 90%;
}
.slide {
  flex: 0 0 270px;
  height: 270px;
  margin: -20px;
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
.carousel-buttons {
  text-align: right;
  margin-right: 50px;
}

button {
  border: none;
  margin: 10px;
  background: transparent;
}
h2 {
  text-align: left;
  font: normal normal 600 32px/38px SF Pro Display;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 50px;
}
</style>
