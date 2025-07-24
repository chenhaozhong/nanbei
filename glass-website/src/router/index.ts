import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: { title: '产品中心' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
    meta: { title: '新闻资讯' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: '关于我们' }
  },
  {
    path: '/technology',
    name: 'Technology',
    component: () => import('../views/Technology.vue'),
    meta: { title: '技术实力' }
  },
//   {
//     path: '/cases',
//     name: 'Cases',
//     component: () => import('../views/Cases.vue'),
//     meta: { title: '工程案例' }
//   },
//   {
//     path: '/contact',
//     name: 'Contact',
//     component: () => import('../views/Contact.vue'),
//     meta: { title: '联系我们' }
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 玻璃制品官网`
  }
  next()
})

export default router 