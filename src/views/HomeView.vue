<script setup lang="ts">
import HomeNav from '@/components/HomeNav.vue'
</script>

<template>
  <section>
    <HomeNav />
    <main class="background h-[var(--main-height)]">
      <h1 class="text-6xl font-bold leading-tight text-center max-w-[75%] mx-auto pt-14">
        Maximize every second of your day with Masterful
        <span class="text-lightBlue italic">Management!</span>
      </h1>
      <p class="text-lg text-center text-ash-300 leading-8 max-w-[65%] mx-auto mt-6">
        Dive into a world of efficient task management with our innovative platform. With just a few clicks,
        you can create, organize, and track tasks with ease, ensuring nothing falls through the cracks.
      </p>
      <div class="flex items-center justify-center gap-x-6 mt-10">
        <RouterLink
          to="app"
          class="flex items-center gap-x-2 py-2.5 text-base px-8 bg-lightBlue rounded-full hover:scale-[1.05] active:scale-[0.95] transition-all"
        >
          Start For Free
        </RouterLink>
        <RouterLink
          to="/"
          class="flex items-center gap-x-2 py-2.5 text-base px-8 bg-white text-dark-100 rounded-full hover:scale-[1.05] active:scale-[0.95] transition-all"
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
