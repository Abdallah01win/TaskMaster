import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import type { List } from '@/types'
import type { Task } from '@/types'
import TasksList from '@/components/TasksList/Index.vue'

describe('TasksList', () => {
  let store: any
  let listStore: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()

    Object.assign(store, { selectedList: 1, nextId: 5 })
  })

  it('renders properly', () => {
    const wrapper = mount(TasksList)

    expect(wrapper).toBeTruthy()
  })

  it('Renders tasks', () => {
    store.addTask({ listId: 1, title: 'testTask', dueDate: new Date() })
    const wrapper = mount(TasksList)

    expect(wrapper.text()).toContain('TestTask')
  })

  it('Deletes user lists', () => {
    listStore = useListStore()
    listStore.createList('testList')

    const list = listStore.lists.find(({ name }: List) => name === 'TestList')
    expect(list).toBeTruthy()

    store.addTask({ listId: list.id, title: 'testTask', dueDate: new Date() })
    const task = store.tasks.find(({ title }: Task) => title === 'TestTask')
    expect(task).toBeTruthy()

    listStore.deleteList(list.id)
    const deletedList = listStore.lists.find(({ id }: List) => id === list.id)
    const deletedTask = store.tasks.find(({ listId }: Task) => listId === list.id)
    expect(deletedList).toBeUndefined()
    expect(deletedTask).toBeUndefined()
  })

  it('Renames user lists', () => {
    listStore = useListStore()
    listStore.createList('testList')
    const list = listStore.lists.find(({ name }: List) => name === 'TestList')

    listStore.renameList(list.id, 'testList2')
    const renamedList = listStore.lists.find(({ id }: List) => id === list.id)

    expect(renamedList.name).toBe('TestList2')
  })
})
