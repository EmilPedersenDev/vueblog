import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import userStore from "@/store/user-store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/articles',
            name: 'articles',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/ArticlesView.vue'),
        },
        {
            path: '/articles/:id',
            name: 'article',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/ArticleView.vue'),
        },
        {
            path: '/articles/create',
            name: 'create article',
            meta: {requiresAuth: true},
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/CreateArticle.vue'),
            beforeEnter: (to, from) => {
                const store = userStore()
                if (to.meta.requiresAuth && !store?.userId) return '/articles'
            }
        },
    ]
})

export default router
