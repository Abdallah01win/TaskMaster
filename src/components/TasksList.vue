<script setup lang="ts">
import TaskForm from "./TaskForm.vue";
import { useTaskStore } from "@/stores/task"
import { useListStore } from "@/stores/list";
import { storeToRefs } from "pinia"

const tasksStore = useTaskStore()
const listStore = useListStore()

const { listTasks, total, completedTasks } = storeToRefs(tasksStore)
const { currentListInfo } = storeToRefs(listStore)
const { completeTask } = tasksStore
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-3xl mb-4">{{ currentListInfo?.name }}</div>
    <div class="bg-dark-300 rounded-xl p-12">
      <div class="taskList">
        <div>
          <div v-for="(todo, index) in listTasks" :key="todo.id" @click="completeTask(todo.id)">
            {{ index + 1 }} - {{ todo.title }} -
            {{ todo.completed ? "done" : "not done" }}
          </div>
          <div class="flex justify-between">
            <div>Total: {{ total }}</div>
            <div>Done: {{ completedTasks.length + "/" + total }}</div>
          </div>
        </div>
      </div>

    </div>
    <TaskForm class="mt-auto" :selected-list="currentListInfo?.id" />
  </div>
</template>
