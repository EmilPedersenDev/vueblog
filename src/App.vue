<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <main id="app">
    <nav-bar/>
  </main>

  <RouterView/>
</template>

<style scoped>
</style>
