import { beforeAll, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useTaskStore } from '@/stores/task'
import { formatDate } from '@/helpers/index'
import TaskDetails from '@/components/TaskDetails.vue'

describe('TaskDetails', () => {
  let store: any
  const task = {
    id: 1,
    listId: 1,
    title: 'TestTask',
    completed: false,
    description: '',
    createdAt: '2022-01-01T00:00:00.000Z',
  }

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    Object.assign(store, { tasks: [task] })
  })

  it('Renders properly', () => {
    const wrapper = mount(TaskDetails, { props: { task } })

    expect(wrapper).toBeTruthy()
  })

  it('Renders task details', () => {
    const wrapper = mount(TaskDetails, { props: { task } })

    expect(wrapper.text()).toContain('TestTask')
    expect(wrapper.text()).toContain(formatDate(task.createdAt).date)
  })

  it('Updates task description', async () => {
    const wrapper = mount(TaskDetails, { props: { task } })
    const input = wrapper.find('input[name="description"]')

    await input.setValue('test description')
    await input.trigger('keypress.enter')

    expect(wrapper.text()).toContain('Test description')
    expect(store.tasks[0].description).toBe('Test description')
  })

  it('Updates task due date', async () => {
    const wrapper = mount(TaskDetails, { props: { task } })
    const input = wrapper.find('input[name="due_date"]')
    const date = new Date().toISOString().split('T')[0]

    await input.setValue(date)

    expect(wrapper.text()).toContain(formatDate(date).date)
    expect(formatDate(store.tasks[0].dueDate).date).toBe(formatDate(date).date)
  })
})
