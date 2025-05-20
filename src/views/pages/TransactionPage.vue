<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import TransactionRow from "@/views/components/transaction/TransactionRow.vue";
import WalletCard from "@/views/components/transaction/WalletCard.vue";

import { onMounted, ref } from "vue";
import useGlobal from "@/composables/global";
import useLocale from "@/composables/locale";

import { WalletModel } from "@/models/wallet.model";
import { TransactionModel } from "@/models/transaction.model";

const {
  $repos: {
    wallet: walletRepo,
    transaction: transactionRepo,
  },
} = useGlobal();
const locale = useLocale();

const wallet = ref<WalletModel | null>(null);
const transactions = ref<TransactionModel[]>([]);

// TODO: Load all wallets
onMounted(async () => {
  const walletsResult = await walletRepo.getWallets();
  if (walletsResult.hasError()) {
    // TOAST Error
    return;
  }

  const wallets = walletsResult.getValue();
  if (wallets.length === 0) {
    return;
  }

  wallet.value = walletsResult.getValue()[0];

  const transactionsResult = await transactionRepo.getTransactions();
  if (transactionsResult.hasError()) {
    // TOAST Error
    return;
  }

  transactions.value = transactionsResult.getValue();
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ locale.t("transaction.name") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ locale.t("transaction.name") }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <wallet-card v-if="wallet"
        :name="wallet.name"
        :amount="wallet.amount"
        :background-color="wallet.color"
      />

      <ion-title>{{ locale.t("transaction.name") }}</ion-title>

      <transaction-row v-for="t in transactions"
        :key="t.id"
        :type="t.type"
        :amount="t.amount"
        :category="t.categoryId"
        :description="t.description"
        :timestamp="t.timestamp"
        :wallet-id="t.walletId"
        :current-wallet-id="wallet.id"
      >
      </transaction-row>
    </ion-content>
  </ion-page>
</template>
