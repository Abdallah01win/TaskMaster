import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import TasksList from '@/components/TasksList/Index.vue'
import { capitalize, createTestList, createTestTask, findList, findTask } from '@/helpers'

describe('TasksList', () => {
  let store: any
  let listStore: any
  const testList = 'testList'
  const testTask = 'testTask'
  const secondListName = 'testList2'

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
    createTestTask(store, 1, testTask)
    const wrapper = mount(TasksList)

    expect(wrapper.text()).toContain(capitalize(testTask))
  })

  it('Renames user lists', () => {
    listStore = useListStore()

    const list = createTestList(listStore, testList)
    listStore.renameList(list.id, secondListName)

    const renamedList = findList(listStore, 'id', list.id)
    expect(renamedList.name).toBe(capitalize(secondListName))
  })

  it('Deletes user lists', () => {
    listStore = useListStore()

    const list = createTestList(listStore, testList)
    expect(list).toBeTruthy()

    createTestTask(store, list.id, testTask)
    expect(findTask(store, 'title', capitalize(testTask))).toBeTruthy()

    listStore.deleteList(list.id)

    expect(findList(listStore, 'id', list.id)).toBeUndefined()
    expect(findTask(store, 'listId', list.id)).toBeUndefined()
  })
})
