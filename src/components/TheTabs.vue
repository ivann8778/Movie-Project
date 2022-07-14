<template>
  <div class="nav">
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: tab === selected }"
          @click="setTab(tab)"
          >{{ tab }}</a
        >
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, required: true },
    selected: { type: String, required: true },
  },
  methods: {
    setTab(tab) {
      this.$emit("selected", tab);
    },
  },
};
</script>

<style scoped>
a {
  width: 100px;
}
.nav {
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
}
</style>