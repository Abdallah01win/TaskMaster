<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="w-full h-screen absolute left-0 top-0 bg-dark-100/70 z-50 flex items-center justify-center">
    <div class="w-1/3 bg-light-100 text-dark-100">
      <div>{{ msg }}</div>
      <slot name="action"></slot>
    </div>
  </div>
</template>
