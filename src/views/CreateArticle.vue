<script setup lang="ts">
import Editor from 'primevue/editor';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import {computed, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router'
import userStore from "@/store/user-store";
import api from "@/util/api";

const toast = useToast();
const store = userStore()
const router = useRouter()
const blogText = ref('');
const title = ref("");
const loading = ref(false);
let imageFile = ref<string | Blob>("");
const imageUploadUrl = import.meta.env.VITE_API_URL + "/images";

const invalidFormData = computed<boolean>(() => !title.value || !blogText.value);

const onUpload = (): void => {
  toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
}
const onError = (): void => {
  toast.add({severity: 'error', summary: 'Error', detail: 'Could not upload file', life: 3000});
}
const onSelect = (e: any): void => {
  imageFile.value = e.files[0];
}

const getArticleThumbnail = (thumbnail: string): string => {
  if (!thumbnail) return "";
  return import.meta.env.VITE_API_URL + "/images/" + thumbnail
}

const onSubmitArticle = async (): Promise<void> => {
  try {
    loading.value = true

    if (invalidFormData.value) {
      throw new Error("All fields was not filled in");
    }

    let thumbnail = "";

    if (imageFile.value) {
      const formData = new FormData();
      formData.append("image", imageFile.value);

      let {data} = await api.post(`/images`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })

      thumbnail = data;
    }


    const articleRequest = {
      title: title.value,
      text: blogText.value,
      thumbnail: getArticleThumbnail(thumbnail) || ""
    }


    await api.post(`/articles?blogUserId=${store?.userId}`, articleRequest);

    loading.value = false;
    toast.add({
      severity: 'success',
      summary: 'New article was created!',
      life: 3000
    });
    setTimeout(() => {
      router.push({path: "/"});
    }, 2000)
  } catch (e: any) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: e.response?.data?.errors[0]?.defaultMessage || e.response?.data?.message || e?.message || "Error",
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section id="create-article">
    <div class="create-article__wrapper">
      <h1>Create Article</h1>
      <div class="create-article__info">
        <div class="form-item">
          <label for="title">Title</label>
          <InputText id="title" v-model="title" placeholder="add title..." type="text"/>
        </div>
        <div class="article-img-upload card flex justify-content-center">
          <FileUpload mode="basic" name="image" :url="imageUploadUrl" accept="image/*"
                      :maxFileSize="1000000"
                      @upload="onUpload" @error="onError" @select="onSelect" chooseLabel="Upload article thumbnail"
                      v-tooltip.top="'The image will be displayed on the home page and as a hero banner on the article'"/>
        </div>
      </div>
      <div class="article-rte">
        <div class="card">
          <Editor v-model="blogText" editorStyle="height: calc(100% - 44px)"/>
        </div>
      </div>
      <div class="article-rte__cta">
        <Button type="button" label="Create Article"
                @click="onSubmitArticle"
                :disabled="invalidFormData"
                :loading="loading"/>
      </div>
    </div>
  </section>
  <Toast/>
</template>

<style lang="scss" scoped>
@import "src/assets/mixins.scss";

$full-height: calc(100vh - 60px);

#create-article {
  height: 100%;
  min-height: $full-height;
  width: 100%;
  padding: 0 2rem 2rem;
  display: flex;
  justify-content: center;

  .create-article__wrapper {
    width: 100%;
    max-width: 800px;

    .create-article__info {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .form-item {
        flex: 1;
        margin-bottom: 1rem;
      }

      .article-img-upload {
      }
    }

    .article-rte {
      height: 60vh;
      margin-bottom: 2rem;

      .card {
        height: 100%;

        .p-editor-container {
          height: 100%;
        }
      }
    }

    .article-rte__cta {
      display: flex;
      align-items: center;
      gap: 1rem;

      .pi {
        transition: all ease 0.2s;

        &:hover {
          cursor: help;
          color: var(--color-text);
        }

        color: orange;
      }

      button {
        display: inline-flex;
        gap: 0.5rem;
      }
    }
  }

  h1 {
    padding: 1rem 0 0;
  }
}
</style>
