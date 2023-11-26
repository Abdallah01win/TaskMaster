import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface toDo {
  id: number
  title: string
  completed: boolean
}

export const useTodoStore = defineStore('toDo', () => {
  const toDos = ref<Array<toDo>>([])
  const nextId = ref<number>(1)

  const total = computed(() => toDos.value.length)

  const remainingTodos = computed(() => {
    return toDos.value.filter((todo) => !todo.completed)
  })

  const completedTodos = computed(() => {
    return toDos.value.filter((todo) => todo.completed)
  })

  function addTodo(todo: toDo) {
    toDos.value.push(todo)
    nextId.value++
  }

  function completeTodo(id: number) {
    const toDo = toDos.value.find((todo) => todo.id === id)
    if (toDo) {
      toDo.completed = !toDo.completed
    }
  }

  function removeTodo(id: number) {
    toDos.value = toDos.value.filter((todo) => todo.id !== id)
  }

  return { toDos, total, remainingTodos, completedTodos, nextId, addTodo, completeTodo, removeTodo }
})
