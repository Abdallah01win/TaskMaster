<script setup lang="ts">
import { ref } from 'vue'

const showListActions = ref(false)
</script>
<template>
  <div class="relative inline-block text-left">
    <div @click="showListActions = !showListActions">
      <slot name="trigger"></slot>
    </div>

    <div
      v-show="showListActions"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>
