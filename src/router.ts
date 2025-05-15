import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/pages/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/transaction",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/transaction",
      },
      {
        path: "transaction",
        component: () => import("@/views/pages/TransactionPage.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/pages/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/pages/Tab3Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
