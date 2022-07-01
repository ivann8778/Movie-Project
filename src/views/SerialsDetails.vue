<template>
  <div class="container">
    <div class="row">
      <div v-if="isFetched" class="col-sm">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${serialDetail.backdrop_path}`"
        />
      </div>
      <div v-if="isFetched" class="col-sm">
        <h1>{{ serialDetail.original_name }}</h1>
        <h3 id="genre" v-for="detail in serialDetail.genres" :key="detail.id">
          | {{ detail.name }}|
        </h3>
        <h3>{{ serialDetail.overview }}</h3>
      </div>
    </div>
  </div>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="credit in creditDetail" :key="credit.id">
        <img
          id="profile_path"
          :src="
            credit.profile_path
              ? 'https://image.tmdb.org/t/p/w500/' + credit.profile_path
              : this.noImg
          "
        />
        <h3>{{ credit.name }}</h3>
        <p>{{ credit.character }}</p>
      </div>
    </transition-group>
  </div>
  <!-- <div v-for="similar in similarDetail" :key="similar.id">
    <img :src="`https://image.tmdb.org/t/p/w500/${similar.poster_path}`" />
  </div> -->
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      serialDetail: null,
      creditDetail: null,
      similarDetail: null,
      isFetched: false,
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
    };
  },
  computed: {
    serial() {
      return this.$store.getters["getSerials/serialdetails"];
    },
    credit() {
      return this.$store.getters["getSerials/credits"].slice(0, 6);
    },
    similar() {
      return this.$store.getters["getSerials/similar"];
    },
  },
  methods: {
    async loadSerialDetails() {
      await this.$store.dispatch("getSerials/getSerialDetails", {
        id: this.id,
      });
      this.serialDetail = this.serial;
      this.isFetched = true;
    },
    async loadCredits() {
      await this.$store.dispatch("getSerials/getCredits", {
        id: this.id,
      });
      this.creditDetail = this.credit;
      this.isFetched = true;
      //console.log(this.creditDetail);
    },
    async loadSimilarSerial() {
      await this.$store.dispatch("getSerials/getSemilarSerial", {
        id: this.id,
      });
      this.similarDetail = this.similar;
      this.isFetched = true;
      //console.log(this.similarDetail);
    },
  },
  created() {
    this.loadSerialDetails();
    this.loadCredits();
    this.loadSimilarSerial();
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 25em;
}
.carousel div {
  height: 400px;
  border-radius: 10px;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 30px;
  background-color: #151f2e;
  color: white;
}
.container {
  margin: 30px 40px 30px 40px;
  color: #eeeeee;
  font: normal normal 300 25px/30px SF Pro Text;
  letter-spacing: 0.1px;
}

#profile_path {
  border-radius: 10px 10px 0 0;
  width: 75%;
  max-width: 300px;
}
.container {
  margin-top: 30px;
  color: #eeeeee;
  font: normal normal 300 25px/30px SF Pro Text;
  letter-spacing: 0.1px;
}
.col-sm {
  margin: 50px;
}

img {
  border-radius: 6px;
  width: 100%;
}
#genre {
  display: inline;
}
</style>