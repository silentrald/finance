import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/pages/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/transactions",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/transactions",
      },
      {
        path: "transactions",
        component: () => import("@/views/pages/TransactionPage.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/pages/Tab2Page.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/pages/SettingsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
