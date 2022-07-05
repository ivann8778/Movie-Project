<template>
  <div id="details">
    <div class="container">
      <div class="row">
        <div id="backdrop_path" v-if="movieDetail" class="col-sm">
          <img
            id="mainImg"
            :src="`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`"
          />
        </div>
        <div v-if="movieDetail" id="text" class="col-sm">
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
  <TheTabs />
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
    <hr />
  </div>

  <div id="reviews" class="row">
    <div
      id="review"
      v-for="reviews in reviewsDetail"
      :key="reviews.id"
      class="col"
    >
      <img
        v-if="reviewsDetail.length > 0"
        id="avatar"
        :src="
          reviews.author_details.avatar_path > 25
            ? 'https://image.tmdb.org/t/p/w500/' +
              reviews.author_details.avatar_path
            : this.noImg
        "
      />
      <StarRating
        id="starrating"
        v-model:rating="reviews.author_details.rating"
        :readOnly="true"
      />
      <h1>{{ reviews.author }}</h1>
      <p>{{ reviews.content.substr(0, 300) }}</p>
    </div>
  </div>
  <hr />
  <div class="carousel-buttons">
    <button @click="previous">
      <i class="arrow left"></i>
    </button>
    <button @click="next">
      <i class="arrow right"></i>
    </button>
  </div>
  <div id="video" class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="video in videoDetail" class="slide" :key="video.id">
        <div class="container">
          <iframe v-if="videoDetail.length > 0" :src="url + video.key"></iframe>
        </div>
      </div>
    </transition-group>
  </div>
  <hr />
  <h2>Similar productions to watch</h2>
  <div id="carouselViewSimilar" class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div id="similar" v-for="similar in similarDetail" :key="similar.id">
        <img
          v-if="similarDetail.length > 0"
          id="similarImg"
          :src="
            similar.poster_path
              ? 'https://image.tmdb.org/t/p/w500/' + similar.poster_path
              : this.noImg
          "
        />
        <h2 v-else>Sorry but there are no similar productions.</h2>
      </div>
    </transition-group>
  </div>
  <button>
    <a href="#details" class="glyphicon glyphicon-arrow-up"></a>
  </button>
</template>

<script>
import TheTabs from "../components/TheTabs.vue";
import StarRating from "vue-star-rating";

export default {
  components: { TheTabs, StarRating },
  props: ["id", "category"],
  data() {
    return {
      movieDetail: null,
      creditDetail: null,
      similarDetail: null,
      reviewsDetail: null,
      videoDetail: null,
      isFetched: false,
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
      url: "https://www.youtube.com/embed/",
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
    videos() {
      return this.$store.getters["getDetails/videos"];
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
      //console.log(this.reviewsDetail);
    },
    async loadVideos() {
      await this.$store.dispatch("getDetails/getVideos", {
        id: this.id,
        category: this.category,
      });
      this.videoDetail = this.videos;
      this.isFetched = true;
      //console.log(this.reviewsDetail);
    },

    next() {
      const first = this.videoDetail.shift();
      this.videoDetail = this.videoDetail.concat(first);
    },
    previous() {
      const last = this.videoDetail.pop();
      this.videoDetail = [last].concat(this.videoDetail);
    },
  },
  created() {
    this.loadDetails();
    this.loadCredits();
    this.loadSimilar();
    this.loadReviews();
    this.loadVideos();
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
  height: 450px;
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
  border-radius: 10px;
  width: 80%;
  padding: -10px;
}
#mainImg {
  max-width: 300px;
  border-radius: 10px;
  margin: 10px 0;
}
#similar {
  margin: auto;
}
#similarImg {
  border-radius: 10px;
  max-width: 300px;
  margin: 7px;
}
#starrating {
  justify-content: space-around;
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
  color: white;
}
#review {
  border-left: 1px solid #151f2e;
  border-right: 1px solid #151f2e;
}
iframe {
  width: 100%;
  height: 250px;
  margin-left: -10px;
  margin-right: 10px;
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
</style>