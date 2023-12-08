import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useListStore } from "./list"

export interface task {
  id: number
  listId: number
  title: string
  completed: boolean
}

export const useTaskStore = defineStore("task", () => {
  const listStore = useListStore()

  const tasks = ref<Array<task>>([])
  const nextId = ref<number>(1)

  const listTasks = computed(() => {
    return tasks.value.filter((task) => task.listId === listStore.selectedList)
  })

  const remainingTasks = computed(() => {
    return listTasks.value.filter((task) => !task.completed)
  })

  const completedTasks = computed(() => {
    return listTasks.value.filter((task) => task.completed)
  })

  const total = computed(() => listTasks.value.length)

  function addTask(task: task) {
    tasks.value.push(task)
    nextId.value++
  }

  function completeTask(id: number) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return {
    tasks,
    total,
    remainingTasks,
    completedTasks,
    nextId,
    addTask,
    completeTask,
    removeTask,
    listTasks,
  }
})
