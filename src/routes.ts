import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const HomePage = () => import("./pages/HomePage.vue");
const ShopPage = () => import("./pages/ShopPage.vue");
const CollectionPage = () => import("./pages/CollectionPage.vue");
const LoginPage = () => import("./pages/LoginPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");

const routes: RouteRecordRaw[] = [
  { name: "home", path: "/", component: HomePage },
  { name: "shop", path: "/shop/", component: ShopPage },
  {
    name: "collection",
    path: "/shop/:collectionId",
    props: true,
    component: CollectionPage,
  },
  { name: "login", path: "/login", component: LoginPage },
  {
    name: "not-found",
    path: "/(.*)",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (!savedPosition) return { top: 0 };
    return savedPosition;
  },
});

export default router;
