<script setup lang="ts">
import TasksList from '@/components/TasksList.vue'
import Navigation from '@/components/Navigation/Index.vue'
</script>

<template>
  <Navigation>
    <template #tab>
      <main class="h-full">
        <TasksList />
      </main>
    </template>
  </Navigation>
</template>
