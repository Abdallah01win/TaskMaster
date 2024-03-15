import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { useListStore } from '@/stores/list'
import router from '@/router'
import Navigation from '@/components/Navigation/Index.vue'
import { capitalize, findList } from '@/helpers'

const globalOptions = {
  global: {
    plugins: [router],
  },
}

describe('Navigation', () => {
  let store: any
  const testList = 'testList'

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useListStore()
  })

  it('Renders properly', () => {
    const wrapper = mount(Navigation, globalOptions)

    expect(wrapper).toBeTruthy()
  })

  it('Renders lists', () => {
    const wrapper = mount(Navigation, globalOptions)

    expect(wrapper.find('ul').find('li')).toBeTruthy()
  })

  it('Creates a new list', async () => {
    const wrapper = mount(Navigation, globalOptions)

    await wrapper.find('input').setValue(testList)
    await wrapper.find('form').trigger('submit')

    expect(findList(store, 'name', capitalize(testList))).toBeTruthy()
  })
})
