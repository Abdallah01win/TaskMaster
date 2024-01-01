import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { useListStore } from '@/stores/list'
import type { List } from '@/stores/list'
import Navigation from '@/components/Navigation/Index.vue'

describe('Navigation', () => {
  let store: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useListStore()
  })

  it('Renders properly', () => {
    const wrapper = mount(Navigation)

    expect(wrapper).toBeTruthy()
  })

  it('Renders lists', () => {
    const wrapper = mount(Navigation)

    expect(wrapper.find('ul').find('li')).toBeTruthy()
  })

  it('Creates a new list', async () => {
    const wrapper = mount(Navigation)

    await wrapper.find('input').setValue('testList')
    await wrapper.find('form').trigger('submit')

    const list = store.lists.find((list: List) => list.name === 'TestList')
    expect(list).toBeTruthy()
  })
})
