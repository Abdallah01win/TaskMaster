<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/task'
import type { Task } from '@/stores/task'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import TaskForm from './TaskForm.vue'
import TaskDetails from './TaskDetails.vue'

const tasksStore = useTaskStore()
const listStore = useListStore()

const { listTasks, total, completedTasks } = storeToRefs(tasksStore)
const { currentListInfo } = storeToRefs(listStore)
const { completeTask } = tasksStore

const selectedTask = ref<Task | null>(null)

const resetSelectedTask = () => {
  selectedTask.value = null
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-3xl mb-4 font-semibold">{{ currentListInfo?.name }}</div>
    <div class="grid" :class="selectedTask ? 'grid-cols-[1fr_.6fr] gap-x-3' : 'grid-cols-1 gap-x-0'">
      <div class="taskList">
        <div class="flex flex-col gap-y-3">
          <div
            v-for="task in listTasks"
            :key="task.id"
            class="flex items-center bg-dark-300 rounded-md px-4 py-2.5 cursor-pointer"
            @click.self="selectedTask = task"
          >
            <div class="cursor-pointer mr-2" @click="completeTask(task.id)">
              <Icon v-show="!task.completed" icon="ph-circle" />
              <Icon v-show="task.completed" icon="ph-check-circle" />
            </div>
            <div :class="task.completed ? 'line-through text-white/40' : ''">
              {{ task.title }}
            </div>
          </div>

          <!-- <div class="flex justify-between">
            <div>Total: {{ total }}</div>
            <div>Done: {{ completedTasks.length + "/" + total }}</div>
          </div> -->
        </div>
      </div>

      <TaskDetails v-show="selectedTask" :task="selectedTask ?? {}" @close="resetSelectedTask" />
    </div>
    <TaskForm class="mt-auto" :selected-list="currentListInfo?.id" />
  </div>
</template>
