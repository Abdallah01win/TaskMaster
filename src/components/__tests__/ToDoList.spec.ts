import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoList from '@/components/ToDoList.vue'

beforeAll(() => {
  setActivePinia(createPinia())
})

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(ToDoList)
    expect(wrapper).toBeTruthy()
  })
})
