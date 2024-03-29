<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import type { Task } from '@/types'
import Icon from '@/components/Icon.vue'

const tasksStore = useTaskStore()
const { completeTask, favoriteTask, importantTask } = tasksStore

defineProps<{ task: Task }>()

const emit = defineEmits<{ selectTask: [task: Task] }>()
</script>

<template>
  <div
    class="flex items-center justify-between bg-dark-300 rounded-md px-4 py-2.5 cursor-pointer"
    @click.self="emit('selectTask', task)"
  >
    <div class="flex items-center">
      <div class="cursor-pointer mr-2" @click="completeTask(task?.id)">
        <span :title="task?.completed ? 'Restore task' : 'Complete task'">
          <Icon :icon="task?.completed ? 'check-circle-fill' : 'circle'" :width="4" />
        </span>
      </div>
      <div :class="task?.completed ? 'line-through text-ash-200' : ''">
        {{ task?.title }}
      </div>
    </div>

    <div class="flex items-center gap-x-3">
      <span @click="importantTask(task?.id)" :title="task?.important ? 'Remove from important' : 'Important'">
        <Icon :icon="task?.important ? 'tag-chevron-fill' : 'tag-chevron'" />
      </span>
      <span
        @click="favoriteTask(task?.id)"
        :title="task?.favorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <Icon :icon="task?.favorite ? 'star-fill' : 'star'" />
      </span>
    </div>
  </div>
</template>
