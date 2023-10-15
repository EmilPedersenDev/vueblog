<script setup lang="ts">
</script>

<template>
  <main id="home">
    <div class="home__container">
      <h1>Blog</h1>
      <router-link to="/articles">Go to articles</router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "src/assets/mixins.scss";

#home {
  width: 100%;
  @include fullHeight;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
  }
}
</style>
