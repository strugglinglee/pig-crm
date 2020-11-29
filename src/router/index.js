import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue'),
    redirect: 'category',
    children: [
      {
        path: '/category',
        name: 'category',
        component: () =>
          import(
            /* webpackChunkName: "category" */ '../views/category/index.vue'
          ),
      },
      {
        path: '/text',
        name: 'text',
        component: () =>
          import(/* webpackChunkName: "text" */ '../views/text/index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
