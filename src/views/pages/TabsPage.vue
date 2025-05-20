<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from "@ionic/vue";
import CreditCardIcon from "@/views/icons/filled/CreditCardIcon.vue";
import GearIcon from "@/views/icons/filled/GearIcon.vue";
import { ellipse } from "ionicons/icons";

import useLocale from "@/composables/locale";

const { t } = useLocale();
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/transactions">
          <credit-card-icon class="tab-icon"
            height="24"
            aria-hidden="true"
          />
          <ion-label>{{ t("transaction.name") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/settings">
          <gear-icon class="tab-icon"
            height="24"
            aria-hidden="true"
          />
          <ion-label>{{ t("settings.name") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<style scoped>
.tab-icon {
  margin-bottom: 4px;
}
</style>
