import type { Task } from '@/stores/task'

export const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const formatDate = (date: string) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const timeOptions = { hour: 'numeric', minute: 'numeric' }

  const formattedDate = new Date(date).toLocaleDateString(undefined, dateOptions)
  const formattedTime = new Date(date).toLocaleTimeString(undefined, timeOptions)

  return { date: formattedDate, time: formattedTime }
}

export function isToday(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export function filterTasks(task: Task, selectedList: number) {
  switch (selectedList) {
    case 1:
      return task?.dueDate ? isToday(task?.dueDate) : null
    case 2:
      return task.important
    case 3:
      return task.favorite
    case 4:
      return task.completed
    case 5:
      return task
    default:
      return task.listId === selectedList
  }
}

export function initTask(listId: number) {
  const currentDate = new Date().toISOString()

  return {
    dueDate: listId == 1 ? currentDate : '',
    important: listId == 2,
    favorite: listId == 3,
    completed: listId == 4,
    createdAt: currentDate,
  }
}
