import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskDetails from '@/components/TaskDetails.vue'

const formatDate = vi.fn().mockImplementation(() => ({ date: 'mockDate', time: 'mockTime' }))

describe('TaskDetails', () => {
  const task = {
    id: 1,
    listId: 1,
    title: 'TestTask',
    createdAt: '2022-01-01',
  }

  it('Renders properly', () => {
    const wrapper = mount(TaskDetails, { props: { task } })
    expect(wrapper).toBeTruthy()
  })

  it('Displays Tasks', () => {
    const wrapper = mount(TaskDetails, { props: { task } })
    expect(wrapper.text()).toContain('TestTask')
  })
})
