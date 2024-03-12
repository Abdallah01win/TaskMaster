import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import type { Task } from '@/types'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm', () => {
  let store: any
  let props: any

  const setStoreData = (listId: number, nextId: number) => {
    Object.assign(store, { selectedList: listId, nextId: nextId })

    props = {
      selectedList: store?.selectedList,
    }
  }

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
  })

  it('Renders properly', () => {
    setStoreData(1, 5)
    const wrapper = mount(TaskForm, { props })

    expect(wrapper).toBeTruthy()
  })

  it('Adds Tasks to MyDay list', async () => {
    setStoreData(1, 5)
    const wrapper = mount(TaskForm, { props })

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = store.tasks.find((task: Task) => task.id === 5)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(1)
  })

  it('Adds tasks to Important list', async () => {
    setStoreData(2, 6)
    const wrapper = mount(TaskForm, { props })

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = store.tasks.find((task: Task) => task.id === 6)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(2)
    expect(task.important).toBe(true)
  })

  it('Adds tasks to Favorite list', async () => {
    setStoreData(3, 7)
    const wrapper = mount(TaskForm, { props })

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = store.tasks.find((task: Task) => task.id === 7)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(3)
    expect(task.favorite).toBe(true)
  })

  it('Adds tasks to Favorite list', async () => {
    setStoreData(4, 8)
    const wrapper = mount(TaskForm, { props })

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = store.tasks.find((task: Task) => task.id === 8)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(4)
    expect(task.completed).toBe(true)
  })

  it('Adds tasks to custom lists', async () => {
    setStoreData(9, 10)
    const wrapper = mount(TaskForm, { props })

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = store.tasks.find((task: Task) => task.id === 10)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(9)
    expect(task.dueDate).toBe('')
    expect(task.important).toBe(false)
    expect(task.favorite).toBe(false)
    expect(task.completed).toBe(false)
  })
})
