<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import api from "@/util/api";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const article = ref(null);

onBeforeMount(async () => {
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
  }
})

</script>

<template>
  <section id="article">
    <h1>Article</h1>
    <span>By author {{ article?.author }}</span>
    <p v-html="article?.text"></p>
    <Toast/>
  </section>
</template>

<style lang="scss" scoped>
#article {
  width: 100%;
  height: 100%;
  padding: 0 4rem;

  h1 {
    font-size: 2rem;
  }
}
</style>
