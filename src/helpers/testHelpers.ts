import { capitalize } from '.'
import type { List, Task } from '@/types'

function findTask<T extends keyof Task>(store: any, key: T, val: Task[T]): Task {
  return store.tasks.find((el: Task) => el[key] === val)
}

function findList<T extends keyof List>(store: any, key: T, val: List[T]): List {
  return store.lists.find((el: List) => el[key] === val)
}

const createTestList = (store: any, name: string) => {
  store.createList(name)
  return findList(store, 'name', capitalize(name))
}

const createTestTask = (store: any, id: number, name: string) => {
  return store.addTask({ listId: id, title: name, dueDate: new Date() })
}

export default { createTestList, createTestTask, findList, findTask }
