import { capitalize } from '.'
import type { List, Task } from '@/types'

const findTaskByName = (store: any, name: string) => {
  return store.tasks.find(({ title }: Task) => title === capitalize(name))
}

const findListByName = (store: any, name: string) => {
  return store.lists.find((el: List) => el.name === capitalize(name))
}

const createTestList = (store: any, name: string) => {
  store.createList(name)
  return findListByName(store, name)
}

export default { findListByName, findTaskByName, createTestList }
