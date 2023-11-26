<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

defineProps<{
  msg: string
}>()

const countStore = useCounterStore();
const { count, doubleCount } = storeToRefs(countStore);
</script>

<template>
  <div class="text-2xl text-blue-600">
    <h1 class="text-red-900">{{ msg }}</h1>
  </div>

  <div class="flex gap-12">
    <h1 class="text-3xl">{{ count }}</h1>
    <h1 class="text-3xl">{{ doubleCount }}</h1>
  </div>

  <div>
    <input type="number" name="count" id="count" v-model="count">
    <button @click="countStore.increment">Increment</button>
    <button @click="countStore.double">Double</button>
  </div>
</template>