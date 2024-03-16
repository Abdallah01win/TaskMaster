import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import { setStoreData, findTask } from '@/helpers'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm', () => {
  let store: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
  })

  it('Renders properly', () => {
    const wrapper = mount(TaskForm, setStoreData(store, 1, 5))

    expect(wrapper).toBeTruthy()
  })

  it('Adds Tasks to MyDay list', async () => {
    const wrapper = mount(TaskForm, setStoreData(store, 1, 5))

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = findTask(store, 'id', 5)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(1)
  })

  it('Adds tasks to Important list', async () => {
    const wrapper = mount(TaskForm, setStoreData(store, 2, 6))

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = findTask(store, 'id', 6)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(2)
    expect(task.important).toBe(true)
  })

  it('Adds tasks to Favorite list', async () => {
    const wrapper = mount(TaskForm, setStoreData(store, 3, 7))

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = findTask(store, 'id', 7)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(3)
    expect(task.favorite).toBe(true)
  })

  it('Adds tasks to Favorite list', async () => {
    const wrapper = mount(TaskForm, setStoreData(store, 4, 8))

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = findTask(store, 'id', 8)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(4)
    expect(task.completed).toBe(true)
  })

  it('Adds tasks to custom lists', async () => {
    const wrapper = mount(TaskForm, setStoreData(store, 9, 9))

    await wrapper.find('input').setValue('testTask')
    await wrapper.find('form').trigger('submit')

    const task = findTask(store, 'id', 9)

    expect(task).toBeTruthy()
    expect(task.listId).toBe(9)
    expect(task.dueDate).toBe('')
    expect(task.important).toBe(false)
    expect(task.favorite).toBe(false)
    expect(task.completed).toBe(false)
  })
})
