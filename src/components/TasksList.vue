<script setup lang="ts">
import { useTaskStore } from "@/stores/task"
import { useListStore } from "@/stores/list";
import { storeToRefs } from "pinia"
import { ref } from "vue"

const tasksStore = useTaskStore()
const listsStore = useListStore()

const { listTasks, total, completedTasks, nextId } = storeToRefs(tasksStore)
const { selectedList } = storeToRefs(listsStore)

const { addTask, completeTask } = tasksStore

const todoItem = ref("")

const create = () => {
  addTask({
    id: nextId.value,
    listId: selectedList.value,
    title: todoItem.value,
    completed: false,
  })

  todoItem.value = ""
}
</script>

<template>
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

    <form @submit.prevent="create">
      <input v-model="todoItem" type="text" name="title" id="title" class="text-black" />
    </form>
  </div>
</template>
