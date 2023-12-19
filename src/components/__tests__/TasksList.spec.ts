import { createPinia, setActivePinia } from "pinia"
import { beforeAll, describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TasksList from "@/components/TasksList.vue"
import { useTaskStore } from "@/stores/task"

describe("TasksList", () => {
  let store: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    Object.assign(store, { selectedList: 1, nextId: 5 })
  })

  it("renders properly", () => {
    const wrapper = mount(TasksList)
    expect(wrapper).toBeTruthy()
  })

  it("Renders tasks", () => {
    store.addTask({ listId: 1, title: "testTask" })
    const wrapper = mount(TasksList)

    expect(wrapper.text()).toContain("TestTask")
  })
})
