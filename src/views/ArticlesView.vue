<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import api from "@/util/api";
import {useToast} from "primevue/usetoast";

const articles = ref([]);
const toast = useToast();

onBeforeMount(async () => {
  try {
    const {data} = await api.get("/articles");
    articles.value = data;
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: e.data?.response?.message || "Error Message",
      life: 3000
    });
  }

});
</script>

<template>
  <section id="articles">
    <h1>Articles</h1>
    <ul>
      <li v-for="(article, i) in articles" :key="i">
        <router-link :to="`/articles/${article.id}`">{{ article.text }}</router-link>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
#articles {
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul {
    margin: 1rem 0;
    padding: 0;

    li {
      text-decoration: none;
      list-style-type: none;
    }
  }
}

</style>
