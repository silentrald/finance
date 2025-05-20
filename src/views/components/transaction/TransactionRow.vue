<script setup lang="ts">
import { TransactionType } from "@/models/transaction.model";
import useLocale from "@/composables/locale";

const {
  type, amount, category,
  description, timestamp,
  currentWalletId, walletId,
} = defineProps<{
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  timestamp: string;

  currentWalletId: string;
  walletId: string;
}>();

const { t } = useLocale();

const amountHook = (() => {
  const isWalletFrom = currentWalletId === walletId;
  function isNegative() {
    // Is an expense or the transfer is outwards
    return type === TransactionType.EXPENSE || (
      type === TransactionType.TRANSFER
      && isWalletFrom
    );
  }

  return {
    getClasses(): string[] {
      const amountClasses = [ "transaction-amount" ];
      if (isNegative()) {
        amountClasses.push("amount-negative");
      } else {
        amountClasses.push("amount-positive");
      }
      return amountClasses;
    },

    format(): string {
      if (isNegative()) {
        return `-${amount}`;
      }
      return `+${amount}`;
    },
  };
})();
</script>

<template>
  <div class="transaction-row">
    <div class="transaction-icon">
      {{ category }}
    </div>

    <div class="transaction-title">
      <span class="transaction-description">
        {{ description }}
      </span>

      <span :class="amountHook.getClasses()">
        {{ amountHook.format() }}
      </span>
    </div>

    <div class="transaction-subtitle">
      <span class="transaction-type">
        {{ t(`transaction.type.${type}`) }}
      </span>

      <span class="transaction-time">
        {{ timestamp }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.transaction-row {
  margin: 8px 16px;
  padding: 8px 16px;
  border-radius: 0.25rem;

  background-color: #666;

  display: grid;

  .transaction-icon {
    grid-column: 1 / 1;
    grid-row: 1 / span 2;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .transaction-title {
    grid-column: 2;
    grid-row: 1;

    font-weight: 700;

    .transaction-amount {
      float: right;

      &.amount-positive {
        color: #82dd55; /* TODO: colors import */
      }

      &.amount-negative {
        color: #e23636; /* TODO: colors import */
      }
    }
  }

  .transaction-subtitle {
    grid-column: 2;
    grid-row: 2;

    .transaction-time {
      float: right;
    }
  }
}
</style>
