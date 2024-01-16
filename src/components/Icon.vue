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
    type: Number,
  },
})
</script>

<template>
  <Icon
    :icon="`ph-${icon}`"
    :class="{ 'cursor-pointer': isClickable, 'w-5 h-5': !width, [`w-${width} h-${width}`]: !!width }"
  />
</template>
