<script setup lang="ts">
import type { Task } from '@/stores/task'
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import TaskForm from '@/components/TaskForm.vue'
import TaskDetails from '@/components/TaskDetails.vue'
import ListHeader from './ListHeader.vue'
import TaskComponent from '@/components/TasksList/Task.vue'

const tasksStore = useTaskStore()
const listStore = useListStore()
const { tasksList } = storeToRefs(tasksStore)
const { currentList } = storeToRefs(listStore)

const selectedTask = ref<Task | null>(null)

watch(
  () => currentList.value.id,
  () => {
    resetSelectedTask()
  },
)

const selectTask = (task: Task) => {
  selectedTask.value = task
}

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
          <TaskComponent v-for="task in tasksList" :key="task.id" :task="task" @selectTask="selectTask" />
        </div>
      </div>

      <TaskDetails v-show="selectedTask" :task="selectedTask ?? {}" @close="resetSelectedTask" />
    </div>
    <TaskForm class="mt-auto" :selected-list="currentList?.id" />
  </div>
</template>
