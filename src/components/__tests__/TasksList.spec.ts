import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import TasksList from '@/components/TasksList.vue'
import { useListStore } from '@/stores/list'
import type { List } from '@/stores/list'
import type { Task } from '@/stores/task'

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

  it('Renames user lists', ()=>{
    const wrapper = mount(TasksList)

    //on rename click:
      // close dropdpwn
      // focuse input
    // on enter click:
      // save new name
      // hide input

  })
})
