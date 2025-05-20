<script lang="ts" setup>
import { computeTextColor } from "@/modules/color";

const {
  name, amount, backgroundColor,
} = defineProps<{
  name: string;
  amount: number;
  backgroundColor: string;
}>();

function getTextColor(color: string) {
  return computeTextColor(color);
}
</script>

<template>
  <div class="wallet-card"
    :style="{
      backgroundColor,
      color: getTextColor(backgroundColor),
    }"
  >
    <div class="wallet-name">
      {{ name }}
    </div>

    <div class="wallet-content" />

    <div class="wallet-amount">
      {{ amount }}
    </div>
  </div>
</template>

<style scoped>
.wallet-card {
  padding: 8px 16px;
  margin: 16px;
  border-radius: 0.25rem;

  display: grid;

  font-size: 24px;

  .wallet-name {
    font-weight: 700;
  }

  .wallet-content {
    height: 150px;
  }

  .wallet-amount {
    text-align: right;
  }
}
</style>
