import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useListStore } from './list'
import { capitalize, filterTasks } from '@/helpers/index'

export interface Task {
  id: number
  listId: number
  title: string
  createdAt: string
  completed: boolean
  favorite?: boolean
  description?: string
  dueDate?: string
}

export const useTaskStore = defineStore('task', () => {
  const listStore = useListStore()

  const tasks = ref<Task[]>([])
  const nextId = ref<number>(1)

  const tasksList = computed(() => {
    return tasks.value.filter((task) => filterTasks(task, listStore.selectedList))
  })

  const remainingTasks = computed(() => {
    return tasksList.value.filter((task) => !task.completed)
  })

  const completedTasks = computed(() => {
    return tasksList.value.filter((task) => task.completed)
  })

  const total = computed(() => tasksList.value.length)

  function addTask(task: Task) {
    const newTask = {
      ...task,
      title: capitalize(task.title),
    }
    tasks.value.push(newTask)
    nextId.value++
  }

  function setTaskInfo(id: number, data: Partial<Task>) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.description = capitalize(data?.description ?? '')
      task.dueDate = data?.dueDate
    }
  }

  function completeTask(id: number) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  function favoriteTask(id: number) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.favorite = !task.favorite
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
    tasksList,
    addTask,
    setTaskInfo,
    completeTask,
    favoriteTask,
    removeTask,
  }
})
