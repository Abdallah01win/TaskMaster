import { createPinia, setActivePinia } from "pinia"
import { beforeAll, describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { useTaskStore } from "@/stores/task"
import type { Task } from "@/stores/task"
import TaskForm from "@/components/TaskForm.vue"

describe("TaskForm", () => {
  let store: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    Object.assign(store, { selectedList: 1, nextId: 5 })
  })

  it("Renders properly", () => {
    const wrapper = mount(TaskForm)
    expect(wrapper).toBeTruthy()
  })

  it("Adds Tasks to the store", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        selectedList: store.selectedList,
      },
    })

    await wrapper.find("input").setValue("testTask")
    await wrapper.find("form").trigger("submit")

    const task = store.tasks.find((task: Task) => task.id === 5)
    expect(task).toEqual({
      id: 5,
      title: "TestTask",
      createdAt: new Date().toISOString(),
      listId: 1,
      completed: false,
    })
  })
})
