import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("./pages/HomePage.vue");
const LoginPage = () => import("./pages/LoginPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");

const routes = [
  { name: "home", path: "/", component: HomePage },
  { name: "login", path: "/login", component: LoginPage },
  { name: "not-found", path: "/:notFound(.*)", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
