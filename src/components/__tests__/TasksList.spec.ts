import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import type { List, Task } from '@/types'
import TasksList from '@/components/TasksList/Index.vue'
import { capitalize, createTestList, findTaskByName } from '@/helpers'

describe('TasksList', () => {
  let store: any
  let listStore: any
  const testList = 'testList'

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
    const testTask = 'testTask'
    listStore = useListStore()

    const list = createTestList(listStore, testList)
    expect(list).toBeTruthy()

    store.addTask({ listId: list.id, title: testTask, dueDate: new Date() })
    expect(findTaskByName(store, testTask)).toBeTruthy()

    listStore.deleteList(list.id)

    const deletedList = listStore.lists.find(({ id }: List) => id === list.id)
    expect(deletedList).toBeUndefined()
    
    const deletedTask = store.tasks.find(({ listId }: Task) => listId === list.id)
    expect(deletedTask).toBeUndefined()
  })

  it('Renames user lists', () => {
    const secondListName = 'testList2'
    listStore = useListStore()

    const list = createTestList(listStore, testList)
    listStore.renameList(list.id, secondListName)
    const renamedList = listStore.lists.find(({ id }: List) => id === list.id)

    expect(renamedList.name).toBe(capitalize(secondListName))
  })
})
