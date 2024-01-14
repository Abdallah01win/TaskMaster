<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    default: '',
  },
  isClickable: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '5',
  },
})
</script>

<template>
  <Icon :icon="`ph-${icon}`" :class="[{ 'cursor-pointer': isClickable }, `w-${width} h-${width}`]" />
</template>
