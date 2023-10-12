<script setup lang="ts">

</script>

<template>
  <header>
    <nav>
      <div class="navbar left">
        <router-link to="/">
          <span>Blog</span>
        </router-link>
      </div>
      <ul class="navbar right">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/articles">Articles</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 60px;
  padding: 0 2rem;

  nav {
    width: inherit;
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;

    .navbar {
      &.left {
        span {
          font-size: 1rem;
          font-weight: 900;
        }
      }

      &.right {
        display: flex;
        gap: 0.75rem;

        li {
          list-style-type: none;
        }
      }
    }
  }
}

</style>
