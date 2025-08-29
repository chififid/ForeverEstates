import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/ui/pages/Home/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { 
        el: to.hash,
        behavior: "smooth",
        top: 80
      };
    }
    return { 
      top: 0,
      behavior: "smooth"
    };
  },
});

export { routes, router };
