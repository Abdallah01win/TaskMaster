import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useListStore } from './list'
import { capitalize } from '@/helpers/index'

export interface Task {
  id: number
  listId: number
  title: string
  completed: boolean
  createdAt: string
  description?: string
  dueDate?: string
}

export const useTaskStore = defineStore('task', () => {
  const listStore = useListStore()

  const tasks = ref<Task[]>([])
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

  function addTask(task: Task) {
    const newTask = { ...task, title: capitalize(task.title) }
    tasks.value.push(newTask)
    nextId.value++
  }

  function setTaskInfo(id: number, data: Partial<Task>) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.description = data?.description
      task.dueDate = data?.dueDate
    }
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
    listTasks,
    addTask,
    setTaskInfo,
    completeTask,
    removeTask,
  }
})
