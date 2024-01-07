<script setup lang="ts">
import { ref } from 'vue'

const showListActions = ref(false)
</script>
<template>
  <div class="relative inline-block text-left text-light-100">
    <div @click="showListActions = !showListActions">
      <slot name="trigger"></slot>
    </div>

    <div
      v-show="showListActions"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-dark-100 overflow-hidden"
    >
      <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>
