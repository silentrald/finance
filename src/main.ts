import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import logger from "./modules/logger";
import { Capacitor } from "@capacitor/core";
import { Platform } from "./types";
import createInitializerService from "./services/initializer.service";
import createDatabaseAppService from "./db/app.service";
import createDatabaseWebService from "./db/web.service";
import createWalletRepo from "./repo/wallet.repo";
import createCategoryRepo from "./repo/category.repo";
import createTransactionRepo from "./repo/transaction.repo";

window.addEventListener("DOMContentLoaded", async () => {
  const platform = Capacitor.getPlatform() as Platform;
  const isWeb = platform === "web";

  const databaseParams = {
    databaseName: "simple-finance",
    databaseVersion: 1,
  };
  const databaseService = isWeb
    ? createDatabaseWebService(databaseParams)
    : createDatabaseAppService(databaseParams);

  const initializerService = createInitializerService({
    platform,
    databaseService,
  });
  const initialized = await initializerService.init();
  if (initialized.hasError()) {
    logger.error("Could not initialize application", initialized.getError().message);
    throw initialized.getError().error;
  }

  const app = createApp(App)
    .use(IonicVue)
    .use(router);

  // === Repo Setup === //
  const dbClientResult = await databaseService.open();
  if (dbClientResult.hasError()) {
    logger.error(
      "Could not get database client",
      dbClientResult.getError().message
    );
    throw dbClientResult.getError().error;
  }
  const databaseClient = dbClientResult.getValue();

  app.config.globalProperties.$repos = {
    wallet: createWalletRepo({ databaseClient }),
    category: createCategoryRepo({ databaseClient }),
    transaction: createTransactionRepo({ databaseClient }),
  };

  router.isReady().then(() => {
    app.mount("#app");
  });
});
