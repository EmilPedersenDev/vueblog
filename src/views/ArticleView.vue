<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import api from "@/util/api";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";
import Skeleton from 'primevue/skeleton';
import {articleThumbnailDefault} from "@/util/constants";

const route = useRoute();
const toast = useToast();
const isLoaded = ref(false);
const article = ref(null);

const articleThumbnail = computed<string>(() => article.value?.thumbnail || articleThumbnailDefault)

onBeforeMount(async (): Promise<void> => {
  try {
    const {data} = await api.get(`/articles/${route?.params?.id}`)
    article.value = data;
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: e.data?.response?.message || "Error Message",
      life: 3000
    });
  } finally {
    isLoaded.value = true;
  }
})

</script>

<template>
  <section id="article" class="blog-container ql-editor">
    <Skeleton height="300" class="article-thumbnail" v-if="!isLoaded"></Skeleton>
    <div v-if="isLoaded" class="article-thumbnail" :style="{backgroundImage: 'url(' +  articleThumbnail + ')'}">
      <div class="article-thumbnail__text">
        <h1>{{ article?.title }}</h1>
        <span>By author {{ article?.author }}</span>
      </div>
    </div>

    <p v-html="article?.text"></p>
    <Toast/>
  </section>
</template>

<style lang="scss">
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
@import 'quill/dist/quill.snow.css';

#article {
  h1 {
    font-size: 2rem;
  }

  .article-thumbnail {
    height: 300px;
    background-size: cover;
    background-position: center;
    position: relative;
    margin-bottom: 2rem;

    .article-thumbnail__text {
      background-color: white;
      width: auto;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 1rem;

      h1, span {
        line-height: normal;
        color: black;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    max-height: 500px;
    object-fit: contain;
  }
}
</style>
