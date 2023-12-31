<script setup lang="ts">
import type { Task } from '@/stores/task'
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import TaskForm from './TaskForm.vue'
import TaskDetails from './TaskDetails.vue'

const tasksStore = useTaskStore()
const listStore = useListStore()

const { tasksList } = storeToRefs(tasksStore)
const { currentListInfo } = storeToRefs(listStore)
const { completeTask, favoriteTask } = tasksStore

const selectedTask = ref<Task | null>(null)

watch(
  () => currentListInfo.value.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      resetSelectedTask()
    }
  },
)

const resetSelectedTask = () => {
  selectedTask.value = null
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-3xl mb-4 font-semibold">{{ currentListInfo?.name }}</div>
    <div
      class="grid overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thumb-dark-100/60 scrollbar-track-dark-300"
      :class="selectedTask ? 'grid-cols-[1fr_.6fr] gap-x-3' : 'grid-cols-1 gap-x-0'"
    >
      <div class="taskList pr-3">
        <div class="flex flex-col gap-y-3">
          <div v-show="!tasksList.length" class="text-center text-gray-400 mt-6">
            No tasks in {{ currentListInfo?.name }}! Add some to get started.
          </div>
          <div
            v-for="task in tasksList"
            :key="task.id"
            class="flex items-center justify-between bg-dark-300 rounded-md px-4 py-2.5 cursor-pointer"
            @click.self="selectedTask = task"
          >
            <div class="flex items-center">
              <div class="cursor-pointer mr-2" @click="completeTask(task?.id)">
                <span :title="task?.completed ? 'Restore task' : 'Complete task'">
                  <Icon :icon="task?.completed ? 'ph-check-circle-fill' : 'ph-circle'" class="w-4 h-4" />
                </span>
              </div>

              <div :class="task?.completed ? 'line-through text-white/40' : ''">
                {{ task?.title }}
              </div>
            </div>
            <div>
              <span
                @click="favoriteTask(task?.id)"
                :title="task?.favorite ? 'Remove from favorites' : 'Add to favorites'"
              >
                <Icon :icon="task?.favorite ? 'ph-star-fill' : 'ph-star'" class="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <TaskDetails v-show="selectedTask" :task="selectedTask ?? {}" @close="resetSelectedTask" />
    </div>
    <TaskForm class="mt-auto" :selected-list="currentListInfo?.id" />
  </div>
</template>
