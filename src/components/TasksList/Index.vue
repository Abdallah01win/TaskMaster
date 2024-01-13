<script setup lang="ts">
import type { Task } from '@/stores/task'
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import Icon from '@/components/Icon.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskDetails from '@/components/TaskDetails.vue'
import ListHeader from './ListHeader.vue'

const tasksStore = useTaskStore()
const listStore = useListStore()

const { tasksList } = storeToRefs(tasksStore)
const { currentList } = storeToRefs(listStore)

const { completeTask, favoriteTask, importantTask } = tasksStore

const selectedTask = ref<Task | null>(null)

watch(
  () => currentList.value.id,
  () => {
    resetSelectedTask()
  },
)

const resetSelectedTask = () => {
  selectedTask.value = null
}
</script>

<template>
  <div class="flex flex-col h-full relative">
    <ListHeader />
    <div
      class="grid overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thumb-ash-200 scrollbar-track-dark-300 pr-3"
      :class="selectedTask ? 'grid-cols-[1fr_.6fr] gap-x-3' : 'grid-cols-1 gap-x-0'"
    >
      <div class="taskList">
        <div class="flex flex-col gap-y-3">
          <div v-show="!tasksList.length" class="text-center text-gray-400 mt-6">
            No tasks in {{ currentList?.name }}! Add some to get started.
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
                  <Icon :icon="task?.completed ? 'check-circle-fill' : 'circle'" :width="4" />
                </span>
              </div>

              <div :class="task?.completed ? 'line-through text-white/40' : ''">
                {{ task?.title }}
              </div>
            </div>
            <div class="flex items-center gap-x-3">
              <span
                @click="importantTask(task?.id)"
                :title="task?.important ? 'Remove from important' : 'Important'"
              >
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
        </div>
      </div>

      <TaskDetails v-show="selectedTask" :task="selectedTask ?? {}" @close="resetSelectedTask" />
    </div>
    <TaskForm class="mt-auto" :selected-list="currentList?.id" />
  </div>
</template>
