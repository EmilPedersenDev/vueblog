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
#home {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
  }
}
</style>
