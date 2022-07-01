<template>
  <div id="details">
    <div class="container">
      <div class="row">
        <div id="backdrop_path" v-if="isFetched" class="col-sm">
          <img
            id="mainImg"
            :src="`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`"
          />
        </div>
        <div v-if="isFetched" id="text" class="col-sm">
          <h1 id="title">
            {{
              movieDetail.original_title
                ? movieDetail.original_title
                : movieDetail.original_name
            }}
          </h1>
          <h3 id="genre" v-for="detail in movieDetail.genres" :key="detail.id">
            | {{ detail.name }} |
          </h3>
          <h3 id="description">{{ movieDetail.overview }}</h3>
        </div>
      </div>
    </div>
  </div>
  <the-tabs></the-tabs>
  <hr />
  <div id="carouselViewCast" class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div id="credit" v-for="credit in creditDetail" :key="credit.id">
        <img
          v-if="creditDetail.length > 0"
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
  <hr />
  <div id="reviews" class="row">
    <div v-for="reviews in reviewsDetail" :key="reviews.id" class="col">
      <img
        v-if="reviewsDetail.length > 0"
        id="avatar"
        :src="
          reviews.author_details.avatar_path
            ? 'https://image.tmdb.org/t/p/w500/' +
              reviews.author_details.avatar_path
            : this.noImg
        "
      />
      <h1>{{ reviews.author }}</h1>
      <p>{{ reviews.content }}</p>
    </div>
  </div>
  <hr />
  <div id="videos">
    <h1>Videos</h1>
    <hr />
  </div>
  <h2>Similar productions to watch</h2>
  <div id="carouselViewSimilar" class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div id="similar" v-for="similar in similarDetail" :key="similar.id">
        <img
          v-if="similarDetail.length > 0"
          id="similarImg"
          :src="
            similar.backdrop_path
              ? 'https://image.tmdb.org/t/p/w500/' + similar.backdrop_path
              : this.noImg
          "
        />
        <h3 v-else>The are no similar productions for this movie/serial</h3>
      </div>
    </transition-group>
  </div>
  <button>
    <a href="#details" class="glyphicon glyphicon-arrow-up"></a>
  </button>
</template>

<script>
import TheTabs from "../components/TheTabs.vue";

export default {
  components: { TheTabs },
  props: ["id", "category"],
  data() {
    return {
      movieDetail: null,
      creditDetail: null,
      similarDetail: null,
      reviewsDetail: null,
      isFetched: false,
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
    };
  },
  computed: {
    movie() {
      return this.$store.getters["getDetails/details"];
    },
    credit() {
      return this.$store.getters["getDetails/credits"].slice(0, 6);
    },
    similar() {
      return this.$store.getters["getDetails/similar"].slice(0, 6);
    },
    reviews() {
      return this.$store.getters["getDetails/reviews"].slice(0, 2);
    },
  },
  methods: {
    async loadDetails() {
      await this.$store.dispatch("getDetails/getDetails", {
        id: this.id,
        category: this.category,
      });
      this.movieDetail = this.movie;
      this.isFetched = true;
      //console.log(this.movieDetail);
    },
    async loadCredits() {
      await this.$store.dispatch("getDetails/getCredits", {
        id: this.id,
        category: this.category,
      });
      this.creditDetail = this.credit;
      this.isFetched = true;
      //console.log(this.creditDetail);
    },
    async loadSimilar() {
      await this.$store.dispatch("getDetails/getSimilar", {
        id: this.id,
        category: this.category,
      });
      this.similarDetail = this.similar;
      this.isFetched = true;
      //console.log(this.similarDetail);
    },
    async loadReviews() {
      await this.$store.dispatch("getDetails/getReviews", {
        id: this.id,
        category: this.category,
      });
      this.reviewsDetail = this.reviews;
      this.isFetched = true;
      //console.log(this.similarDetail);
    },
  },
  created() {
    this.loadDetails();
    this.loadCredits();
    this.loadSimilar();
    this.loadReviews();
  },
};
</script>

<style scoped>
#details {
  background-color: #151f2e;
}
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
  max-height: 25em;
}

#credit {
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
  min-height: 10px;
}
#mainImg {
  border-radius: 10px;
  width: 100%;
  padding: 9px;
}
#similar {
  border-radius: 10px;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 30px;
}
#similarImg {
  border-radius: 10px;
  width: 75%;
  max-width: 300px;
  min-height: 300px;
}
#avatar {
  border-radius: 50%;
  width: 50px;
}

#genre {
  display: inline;
  font: normal normal medium 44px/53px SF Pro Display;
  letter-spacing: 0.18px;
  color: #eeeeee;
}
#title {
  font: normal normal 600 58px/70px SF Pro Display;
  letter-spacing: 0.23px;
  color: #eeeeee;
}
#description {
  font: normal normal 300 25px/30px SF Pro Text;
  letter-spacing: 0.1px;
  color: #eeeeee;
}
#reviews {
  margin: 50px;
}
hr {
  border-top: 1px solid rgb(101, 116, 253);
}
h2 {
  text-align: left;
  font: normal normal 600 32px/38px SF Pro Display;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 50px;
}
.glyphicon {
  border: solid rgb(255, 255, 255);
  border-width: 1px 0 0 1px;
  display: inline-flex;
  padding: 3px;
}
button {
  border: none;
  margin: 10px;
  background: transparent;
}
</style>