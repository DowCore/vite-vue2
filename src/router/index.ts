import Vue from 'vue'
import type { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import PageEditor from '@/views/PageEditor.vue'
Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: Home,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/page-editor',
    name: '看板编辑器',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: PageEditor,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/page-view/:id',
    name: '预览看板',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: () => import('@/views/PageView.vue'),
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/component-editor',
    name: '组件编辑',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: () => import('@/views/PageView.vue'),
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})

export default router
