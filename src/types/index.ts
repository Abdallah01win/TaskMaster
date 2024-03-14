export interface List {
  readonly id: number
  name: string
  icon: string
}

export interface Task {
  readonly id: number
  listId: number
  title: string
  createdAt: string
  completed: boolean
  favorite: boolean
  important: boolean
  description?: string
  dueDate?: string,
}
