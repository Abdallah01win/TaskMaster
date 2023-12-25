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
    createdAt: '2022-01-01T00:00:00.000Z',
  }

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
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

  // updates task description in store
  // updates task dueDate in store
})
