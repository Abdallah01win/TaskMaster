<script setup lang="ts">
import Icon from '@/components/Icon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['cancel'])
</script>

<template>
  <div
    class="w-full h-screen absolute left-0 top-0 bg-dark-100/70 z-50 flex items-center justify-center"
    @click.self="emit('cancel')"
  >
    <div class="min-w-2/5 text-light-100 bg-dark-300 py-4 px-6 rounded">
      <div class="mb-8">
        <div class="w-full flex items-center justify-between gap-x-6 mb-3">
          <div class="text-base">{{ title }}</div>
          <Icon :icon="'x'" @click="emit('cancel')" />
        </div>

        <p class="text-ash-200">
          {{ msg }}
        </p>
      </div>
      <div class="flex items-center justify-end gap-x-4">
        <button class="bg-ash-200 px-4 py-2 rounded-md" @click="emit('cancel')">Cancel</button>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>
