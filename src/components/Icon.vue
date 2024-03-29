<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { staticIconClasses } from '@/constants'

const props = withDefaults(defineProps<{ icon: string; isClickable?: boolean; width?: number }>(), {
  isClickable: true,
})

const findClasses = computed(() => {
  return staticIconClasses.find(({ value }) => value === props.width)?.class || ''
})
</script>

<template>
  <Icon
    :icon="`ph-${icon}`"
    :class="{ 'cursor-pointer': isClickable, 'w-5 h-5': !width, [findClasses]: !!width }"
  />
</template>
