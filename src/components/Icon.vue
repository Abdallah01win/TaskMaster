<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ icon: string; isClickable?: boolean; width?: number }>(), { isClickable: true })
</script>

<template>
  <Icon
    :icon="`ph-${icon}`"
    :class="{ 'cursor-pointer': isClickable, 'w-5 h-5': !width, [`w-${width} h-${width}`]: !!width }"
  />
</template>
