<template>
  <h2>Top Rated</h2>
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
      <div v-for="data in arrayWithData" class="slide" :key="data.id">
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
            <img :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`" />
          </router-link>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "TopRated",
  props: ["category", "getters", "actions"],
  data() {
    return {
      arrayWithData: [],
      isFetched: false,
    };
  },
  computed: {
    data() {
      return this.$store.getters[`${this.getters}`];
    },
  },
  methods: {
    async loadData() {
      await this.$store.dispatch(`${this.actions}`, {
        id: this.id,
        category: this.category,
      });
      this.arrayWithData = this.data;
      this.isFetched = true;
    },
    next() {
      const first = this.arrayWithData.shift();
      this.arrayWithData = this.arrayWithData.concat(first);
    },
    previous() {
      const last = this.arrayWithData.pop();
      this.arrayWithData = [last].concat(this.arrayWithData);
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
