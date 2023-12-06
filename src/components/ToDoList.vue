<script setup lang="ts">
import { useTodoStore } from "@/stores/toDo"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const toDosStore = useTodoStore()
const { toDos, total, completedTodos, nextId } = storeToRefs(toDosStore)
const { addTodo, completeTodo } = toDosStore

const todoItem = ref("")

const create = () => {
  addTodo({
    id: nextId.value,
    title: todoItem.value,
    completed: false,
  })

  todoItem.value = ""
}
</script>

<template>
  <div class="bg-dark-300 rounded-xl p-12">
    <div class="toDoList">
      <div>
        <div v-for="(todo, index) in toDos" :key="todo.id" @click="completeTodo(todo.id)">
          {{ index + 1 }} - {{ todo.title }} -
          {{ todo.completed ? "done" : "not done" }}
        </div>
        <div class="flex justify-between">
          <div>Total: {{ total }}</div>
          <div>Done: {{ completedTodos.length + "/" + total }}</div>
        </div>
      </div>
    </div>

    <form @submit.prevent="create">
      <input v-model="todoItem" type="text" name="title" id="title" class="text-black" />
    </form>
  </div>
</template>
