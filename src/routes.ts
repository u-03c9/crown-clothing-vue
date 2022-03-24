import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import useToastStore from "./pinia/toastStore";
import useUserStore from "./pinia/userStore";
import useShopStore from "./pinia/shopStore";

const HomePage = () => import("./pages/HomePage.vue");
const ShopPage = () => import("./pages/ShopPage.vue");
const CollectionPage = () => import("./pages/CollectionPage.vue");
const LoginPage = () => import("./pages/LoginPage.vue");
const CheckoutPage = () => import("./pages/CheckoutPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");

const routes: RouteRecordRaw[] = [
  { name: "home", path: "/", component: HomePage },
  { name: "shop", path: "/shop/", component: ShopPage },
  {
    name: "collection",
    path: "/shop/:collectionId",
    props: true,
    component: CollectionPage,
    beforeEnter: async (to, from, next) => {
      const collectionId = to.params.collectionId.toString();

      const shopStore = useShopStore();
      const isCollectionExist = await shopStore.getCollectionById(collectionId);

      if (!isCollectionExist) {
        next({
          name: "not-found",
          params: { matchedPath: "/shop/" + collectionId },
        });
      } else {
        next();
      }
    },
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    meta: { requiresNoAuth: true },
  },
  {
    name: "checkout",
    path: "/checkout",
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    name: "not-found",
    path: "/:matchedPath(.*)",
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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  useToastStore().dismissToast();

  if (to.meta.requiresAuth && !userStore.currentUser) {
    next({ name: "login" });
  } else if (to.meta.requiresNoAuth && userStore.currentUser) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
