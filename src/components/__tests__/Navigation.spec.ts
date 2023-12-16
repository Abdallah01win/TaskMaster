import { createPinia, setActivePinia } from "pinia"
import { describe, it, expect, beforeAll } from "vitest"
import { mount } from "@vue/test-utils"
import { useListStore } from "@/stores/list"
import Navigation from "@/components/Navigation.vue"

describe("Navigation", () => {
  let store: any

  beforeAll(() => {
    setActivePinia(createPinia())
    store = useListStore()
  })

  it("Renders properly", () => {
    const wrapper = mount(Navigation)
    expect(wrapper).toBeTruthy()
  })

  it("Renders lists", () => {
    const wrapper = mount(Navigation)
    expect(wrapper.find("ul").find("li")).toBeTruthy()
  })

  it("Creates a new list", async () => {
    const wrapper = mount(Navigation)
    await wrapper.find("input").setValue("testList")
    await wrapper.find("form").trigger("submit")
    const list = store.lists.find((list: any) => list.name === "TestList")

    expect(list).toEqual({ id: 4, name: "TestList", icon: "ph-list" })
  })
})
