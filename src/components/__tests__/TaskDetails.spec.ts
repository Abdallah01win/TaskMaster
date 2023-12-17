import { describe, it, expect, beforeAll } from "vitest"
import { mount } from "@vue/test-utils"
import TaskDetails from "@/components/TaskDetails.vue"

describe("TaskDetails", () => {
  it("Renders properly", () => {
    const wrapper = mount(TaskDetails)
    expect(wrapper).toBeTruthy()
  })

  it("Displays Tasks", () => {
    const wrapper = mount(TaskDetails, {
      props: {
        task: {
          id: 1,
          listId: 1,
          title: "TestTask",
        },
      },
    })
    expect(wrapper.findAll("span")?.at(1)?.text()).toBe("TestTask")
  })
})
