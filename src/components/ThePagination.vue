<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="firstPage">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="firstPage">
        Previous
      </button>
    </li>

    <li class="pagination-item" v-for="page in pages" :key="page.number">
      <button
        type="button"
        @click="onClickPage(page.number)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.number) }"
      >
        {{ page.number }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="lastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="lastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    visibleButtons: {
      type: Number,
      required: false,
      default: 4,
    },
    totalPages: {
      type: Number,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // first page
      if (this.currentPage === 1) {
        return 1;
      }

      //  last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.visibleButtons;
      }

      // inbetween
      return this.currentPage - 2;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.visibleButtons, this.totalPages);
        i++
      ) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    firstPage() {
      return this.currentPage === 1;
    },
    lastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style  scoped>
.pagination {
  list-style-type: none;
  margin-left: 780px;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4a86ae;
  color: #ffffff;
}
button {
  border-radius: 5px;
}
</style>