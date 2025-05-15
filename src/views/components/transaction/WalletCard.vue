<script lang="ts" setup>
const {
  name, amount,
} = defineProps<{
  name: string;
  amount: number;
}>();
</script>

<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ amount }}</div>
  </div>
</template>

<style scoped>

</style>
