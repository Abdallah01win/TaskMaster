import { createPinia, setActivePinia } from "pinia"
import { beforeAll, describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TasksList from "@/components/TasksList.vue"

beforeAll(() => {
  setActivePinia(createPinia())
})

describe("TasksList", () => {
  it("renders properly", () => {
    const wrapper = mount(TasksList)
    expect(wrapper).toBeTruthy()
  })
})
