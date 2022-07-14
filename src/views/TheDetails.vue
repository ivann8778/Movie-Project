<template>
  <the-tab :isSelected="selected === 'Cast'">
    <div id="details">
      <div class="container">
        <div class="row">
          <div id="backdrop_path" v-if="movie" class="col-sm">
            <img
              id="mainImg"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div v-if="movie" id="text" class="col-sm">
            <h1 id="title">
              {{
                movie.original_title
                  ? movie.original_title
                  : movie.original_name
              }}
            </h1>
            <h3 id="genre" v-for="detail in movie.genres" :key="detail.id">
              | {{ detail.name }} |
            </h3>
            <h3 id="description">{{ movie.overview }}</h3>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <the-tabs
      :tabs="['Cast', 'Images', 'Videos', 'Similar']"
      :selected="selected"
      @selected="setSelected"
    ></the-tabs>
    <div id="carouselViewCast" class="carousel-view">
      <transition-group
        v-if="credits.length > 0 && credits"
        class="carousel"
        tag="div"
      >
        <div id="credit" v-for="credit in credits" :key="credit.id">
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
      <h2 v-else>There is no cast for this production.</h2>
    </div>
    <hr />
    <div v-if="reviews && reviews.length > 0" id="reviews" class="row">
      <div id="review" v-for="review in reviews" :key="review.id" class="col">
        <img
          id="avatar"
          :src="
            review.author_details.avatar_path > 25
              ? 'https://image.tmdb.org/t/p/w500/' +
                review.author_details.avatar_path
              : this.noImg
          "
        />
        <StarRating
          id="starrating"
          v-model:rating="review.author_details.rating"
          :readOnly="true"
        />
        <h1>{{ review.author }}</h1>
        <p>{{ review.content.substr(0, 300) }}</p>
      </div>
    </div>
    <h2 v-else>There are no reviews for this production.</h2>
  </the-tab>
  <the-tab :isSelected="selected === 'Images'">
    <div id="details">
      <div class="container">
        <div class="row">
          <div id="backdrop_path" v-if="movie" class="col-sm">
            <img
              id="mainImg"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div v-if="movie" id="text" class="col-sm">
            <h1 id="title">
              {{
                movie.original_title
                  ? movie.original_title
                  : movie.original_name
              }}
            </h1>
            <h3 id="genre" v-for="detail in movie.genres" :key="detail.id">
              | {{ detail.name }} |
            </h3>
            <h3 id="description">{{ movie.overview }}</h3>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <the-tabs
      :tabs="['Cast', 'Images', 'Videos', 'Similar']"
      :selected="selected"
      @selected="setSelected"
    ></the-tabs>
    <div id="carouselViewSimilar" class="carousel-view">
      <transition-group
        v-if="images.length > 0 && images"
        class="carousel"
        tag="div"
      >
        <div id="similar" v-for="image in images" :key="image.id">
          <img
            id="similarImg"
            :src="
              image.file_path
                ? 'https://image.tmdb.org/t/p/w500/' + image.file_path
                : this.noImg
            "
          />
        </div>
      </transition-group>
      <h2 v-else>Sorry but there are no images for this production.</h2>
    </div>
    <hr />
    <div v-if="reviews && reviews.length > 0" id="reviews" class="row">
      <div id="review" v-for="review in reviews" :key="review.id" class="col">
        <img
          id="avatar"
          :src="
            review.author_details.avatar_path > 25
              ? 'https://image.tmdb.org/t/p/w500/' +
                review.author_details.avatar_path
              : this.noImg
          "
        />
        <StarRating
          id="starrating"
          v-model:rating="review.author_details.rating"
          :readOnly="true"
        />
        <h1>{{ review.author }}</h1>
        <p>{{ review.content.substr(0, 300) }}</p>
      </div>
    </div>
    <h2 v-else>There are no reviews for this production.</h2>
  </the-tab>
  <the-tab :isSelected="selected === 'Videos'">
    <div id="details">
      <div class="container">
        <div class="row">
          <div id="backdrop_path" v-if="movie" class="col-sm">
            <img
              id="mainImg"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div v-if="movie" id="text" class="col-sm">
            <h1 id="title">
              {{
                movie.original_title
                  ? movie.original_title
                  : movie.original_name
              }}
            </h1>
            <h3 id="genre" v-for="detail in movie.genres" :key="detail.id">
              | {{ detail.name }} |
            </h3>
            <h3 id="description">{{ movie.overview }}</h3>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <the-tabs
      :tabs="['Cast', 'Images', 'Videos', 'Similar']"
      :selected="selected"
      @selected="setSelected"
    ></the-tabs>
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
        <div v-for="video in videos" class="slide" :key="video.id">
          <div class="container">
            <iframe
              v-if="videos.length > 0"
              :src="YouTubeUrl + video.key"
            ></iframe>
          </div>
        </div>
      </transition-group>
    </div>
    <hr />
    <div v-if="reviews && reviews.length > 0" id="reviews" class="row">
      <div id="review" v-for="review in reviews" :key="review.id" class="col">
        <img
          id="avatar"
          :src="
            review.author_details.avatar_path > 25
              ? 'https://image.tmdb.org/t/p/w500/' +
                review.author_details.avatar_path
              : this.noImg
          "
        />
        <StarRating
          id="starrating"
          v-model:rating="review.author_details.rating"
          :readOnly="true"
        />
        <h1>{{ review.author }}</h1>
        <p>{{ review.content.substr(0, 300) }}</p>
      </div>
    </div>
    <h2 v-else>There are no reviews for this production.</h2>
  </the-tab>
  <the-tab :isSelected="selected === 'Similar'">
    <div id="details">
      <div class="container">
        <div class="row">
          <div id="backdrop_path" v-if="movie" class="col-sm">
            <img
              id="mainImg"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div v-if="movie" id="text" class="col-sm">
            <h1 id="title">
              {{
                movie.original_title
                  ? movie.original_title
                  : movie.original_name
              }}
            </h1>
            <h3 id="genre" v-for="detail in movie.genres" :key="detail.id">
              | {{ detail.name }} |
            </h3>
            <h3 id="description">{{ movie.overview }}</h3>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <the-tabs
      :tabs="['Cast', 'Images', 'Videos', 'Similar']"
      :selected="selected"
      @selected="setSelected"
    ></the-tabs>
    <div id="carouselViewSimilar" class="carousel-view">
      <transition-group
        v-if="similars.length > 0 && similars"
        class="carousel"
        tag="div"
      >
        <div id="similar" v-for="similar in similars" :key="similar.id">
          <img
            id="similarImg"
            :src="
              similar.poster_path
                ? 'https://image.tmdb.org/t/p/w500/' + similar.poster_path
                : this.noImg
            "
          />
        </div>
      </transition-group>
      <h2 v-else>Sorry but there are no similar productions.</h2>
    </div>
    <hr />
    <div v-if="reviews && reviews.length > 0" id="reviews" class="row">
      <div id="review" v-for="review in reviews" :key="review.id" class="col">
        <img
          id="avatar"
          :src="
            review.author_details.avatar_path > 25
              ? 'https://image.tmdb.org/t/p/w500/' +
                review.author_details.avatar_path
              : this.noImg
          "
        />
        <StarRating
          id="starrating"
          v-model:rating="review.author_details.rating"
          :readOnly="true"
        />
        <h1>{{ review.author }}</h1>
        <p>{{ review.content.substr(0, 300) }}</p>
      </div>
    </div>
    <h2 v-else>There are no reviews for this production.</h2>
  </the-tab>
</template>

<script>
import TheTabs from "../components/TheTabs.vue";
import TheTab from "../components/TheTab.vue";
import StarRating from "vue-star-rating";

export default {
  components: { TheTabs, TheTab, StarRating },
  props: ["id", "category"],
  data() {
    return {
      //videoDetail: null,
      isFetched: false,
      noImg:
        "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
      YouTubeUrl: "https://www.youtube.com/embed/",
      selected: "Cast",
    };
  },
  computed: {
    movie() {
      return this.$store.getters["details/details"];
    },
    credits() {
      return this.$store.getters["details/credits"].slice(0, 6);
    },
    similars() {
      return this.$store.getters["details/similar"].slice(0, 4);
    },
    reviews() {
      return this.$store.getters["details/reviews"].slice(0, 2);
    },
    videos() {
      return this.$store.getters["details/videos"];
    },
    images() {
      return this.$store.getters["details/images"];
    },
  },
  methods: {
    // async loadVideos() {
    //   await this.$store.dispatch("getDetails/getVideos", {
    //     id: this.id,
    //     category: this.category,
    //   });
    //   this.videoDetail = this.videos;
    //   this.isFetched = true;
    //   //console.log(this.reviewsDetail);
    // },

    async loadData() {
      await this.$store.dispatch("details/loadAllData", {
        id: this.id,
        category: this.category,
      });
    },

    next() {
      const first = this.videos.shift();
      this.videos = this.videos.concat(first);
    },
    previous() {
      const last = this.videos.pop();
      this.videos = [last].concat(this.videos);
    },
    setSelected(tab) {
      this.selected = tab;
    },
  },
  created() {
    // this.loadVideos();
    this.loadData();
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
  margin: 100px 15px 30px 15px;
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
  text-align: center;
  font: normal normal 600 32px/38px SF Pro Display;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 50px;
}
h3 {
  font-size: 15px;
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