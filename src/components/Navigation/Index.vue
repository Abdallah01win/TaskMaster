<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import NavBar from './NavBar.vue'
import NavAside from './NavAside.vue'
</script>

<template>
  <NavBar />
  <section class="flex h-[var(--main-height)] w-full border-t border-ash-100">
    <NavAside />
    <div class="flex-1 px-10 py-8">
      <slot name="tab"></slot>
    </div>
  </section>
</template>
