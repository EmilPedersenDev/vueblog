<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import Card from 'primevue/card';
import Paginator from 'primevue/paginator';
import api from "@/util/api";

const ARTICLE_PER_PAGE = 9;

const articles = ref([]);
const articlesTotalAmount = ref(0)
const limit = ref(0)
const rows = ref(ARTICLE_PER_PAGE)
const offset = ref(0);
const page = ref(0);
const pageCount = ref(0);

const getArticles = async () => {
  try {
    const {data} = await api.get(`/articles?offset=${offset.value}&limit=${rows.value}`);
    articles.value = data;
  } catch (e) {
    console.error(e.data?.response?.message || e)
  }
}

const getArticlesTotalAmount = async () => {
  try {
    console.log(page)
    const {data} = await api.get(`/articles/total-amount`);
    articlesTotalAmount.value = data;
  } catch (e) {
    console.error(e.data?.response?.message || e)
  }
}

onBeforeMount(async () => {
  page.value += 1;
  await Promise.all[getArticlesTotalAmount(), getArticles()]
});

const convertToUTC = timestamp => {
  const utcTime = new Date(timestamp);
  const day = utcTime.getUTCDate().toString().padStart(2, '0');
  const month = (utcTime.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = utcTime.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const onPage = async (e) => {
  page.value = e.page + 1;
  pageCount.value = e.pageCount;
  rows.value = e.rows;
  limit.value = offset.value * page.value;

  await getArticles();
}
</script>

<template>
  <section id="articles">

    <h1>Articles</h1>
    <ul class="articles__grid">
      <li v-for="(article, i) in articles" :key="i">
        <router-link :to="`/articles/${article.id}`">
          <Card>
            <template #header>
              <img alt="article image"
                   :src="article?.img || 'https://picsum.photos/200/300'"
                   loading="lazy"/>
            </template>
            <template #title> {{ article?.title }}</template>
            <template #subtitle><span>Created: {{ convertToUTC(article?.created) }}</span></template>
          </Card>
        </router-link>
      </li>
    </ul>
    <div class="card">
      <Paginator :rows="rows" :totalRecords="articlesTotalAmount" :rowsPerPageOptions="[9, 18, 27]"
                 v-model:first="offset"
                 v-model:rows="rows" @page="onPage"></Paginator>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#articles {
  width: 100%;
  height: 100%;
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul.articles__grid {
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
    padding: 0;

    @media(max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }

    li {
      text-decoration: none;
      list-style-type: none;


      .p-card.p-component {
        transition: all ease 0.3s;
        box-shadow: rgba(45, 45, 45, 0.2) 0px 0px 10px 2px;

        &:hover {
          transform: translateY(-4px);
          cursor: pointer;
        }

        img {
          height: 200px;
          width: 100%;
          object-fit: cover;
        }

      }
    }
  }
}

</style>

<style lang="scss">
.p-card-content {
  display: none;
}

.p-card-subtitle {
  line-height: normal;

  span {
    font-size: 0.75rem;
  }
}

</style>
