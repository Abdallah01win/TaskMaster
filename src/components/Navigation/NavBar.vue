<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-dark-100">
    <nav class="w-[1024px] xl:w-[1280px] h-[var(--nav-height)] mx-auto flex items-center justify-between">
      <RouterLink to="/" class="mr-10 font-bold text-xl">
        <span>Task</span>
        <span class="text-lightBlue italic">Master</span>
      </RouterLink>
      <div class="flex items-center">
        <ul class="flex items-center gap-x-5 text-ash-300">
          <li class="hover:text-white cursor-pointer">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="hover:text-white cursor-pointer">About</li>
          <li class="hover:text-white cursor-pointer">Features</li>
          <li class="hover:text-white cursor-pointer">Contact</li>
        </ul>
      </div>
      <RouterLink
        to="app"
        class="flex items-center gap-x-2 py-2 px-6 bg-lightBlue rounded-full hover:scale-[1.05] active:scale-[0.95] transition-all"
      >
        Get Started
      </RouterLink>
    </nav>
  </div>
</template>
