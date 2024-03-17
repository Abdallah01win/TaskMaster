<script setup lang="ts">
import Icon from '@/components/Icon.vue'
</script>

<template>
  <div class="bg-dark-100">
    <nav class="px-4 h-[var(--nav-height)] mx-auto flex items-center justify-between">
      <div class="flex items-center">
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
      </div>

      <div class="flex items-center gap-x-4">
        <Icon :icon="'list-dashes'" />
        <Icon :icon="'bell'" />
        <Icon :icon="'gear'" />
        <div class="bg-dark-300 h-10 w-10 rounded-full grid place-content-center cursor-pointer">
          <Icon :icon="'user'" :is-clickable="false" />
        </div>
      </div>
    </nav>
  </div>
</template>
