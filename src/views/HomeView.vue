<script setup lang="ts">
import NavBar from '@/components/Navigation/NavBar.vue'
</script>

<template>
  <section>
    <NavBar />
    <main class="background h-[var(--main-height)]">
      <h1 class="text-7xl font-bold leading-tight text-center max-w-[75%] mx-auto pt-10">
        Maximize every second of your day with Masterful
        <span class="text-lightGreen italic">Management!</span>
      </h1>
      <div class="flex items-center justify-center gap-x-6 mt-12">
        <RouterLink
          to="app"
          class="flex items-center gap-x-2 py-2.5 text-base px-8 bg-lightGreen rounded-lg hover:scale-[1.05] active:scale-[0.95] transition-all"
        >
          Start For Free
        </RouterLink>
        <RouterLink
          to="app"
          class="flex items-center gap-x-2 py-2.5 text-base px-8 bg-transparent border border-ash-300 text-ash-300 rounded-lg hover:scale-[1.05] active:scale-[0.95] transition-all"
        >
          Learn More
        </RouterLink>
      </div>
    </main>
  </section>
</template>

<style scoped>
.background {
  background-image: url('@/assets/images/bg.webp');
  background-size: cover;
}
</style>
