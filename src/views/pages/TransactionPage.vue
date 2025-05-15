<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import WalletCard from "@/views/components/transaction/WalletCard.vue";

import useLocale from "@/composables/locale";

const locale = useLocale();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ locale.t("transaction.header") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <wallet-card name="Wallet Name" :amount="100" />
    </ion-content>
  </ion-page>
</template>
