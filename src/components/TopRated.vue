<template>
  <h2 v-if="category === 'movies'">Top Rated Movies</h2>
  <h2 v-else>Top Rated Series</h2>
  <div class="carousel-buttons">
    <button @click="previous">
      <i class="arrow left"></i>
    </button>
    <button @click="next">
      <i class="arrow right"></i>
    </button>
  </div>
  <div v-if="getGetters && getGetters.length > 0" class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="data in getGetters" class="slide" :key="data.id">
        <div class="container">
          <router-link
            :to="{
              name:
                data.category === 'movies' ? 'MoviesDetails' : 'SerialsDetails',
              params: {
                id: data.id,
                category: data.category,
              },
            }"
          >
            <img :src="`${image}${data.poster_path}`" />
          </router-link>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "TopRated",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      startPage: 1,
      image: "https://image.tmdb.org/t/p/w500/",
    };
  },
  watch: {
    page(newPage) {
      this.loadData(newPage);
    },
  },
  computed: {
    data() {
      return this.category === "movies" ? "movies/movies" : "serials/serials";
    },
    getGetters() {
      return this.$store.getters[this.data];
    },
  },
  methods: {
    async loadData() {
      const action =
        this.category === "movies" ? "movies/getMovies" : "serials/getSerials";
      await this.$store.dispatch(action, {
        page: this.page,
      });
    },
    next() {
      if (this.page > 7) {
        return;
      }
      this.page++;
    },
    previous() {
      if (this.page <= this.startPage) {
        return;
      }
      this.page--;
    },
  },
  created() {
    this.loadData();
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
