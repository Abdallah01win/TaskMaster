import { ref, computed } from "vue"
import { defineStore } from "pinia"

export interface List {
  id: number
  name: string
}

const defaultLists: Array<List> = [
  {
    id: 1,
    name: "My Day",
  },
  {
    id: 2,
    name: "Important",
  },
]

export const useListStore = defineStore("list", () => {
  const lists = ref<Array<List>>([...defaultLists])
  const selectedList = ref<number>(defaultLists[0].id)

  const getSelectedList = computed(() => {
    return lists.value.find(({ id }) => id === selectedList.value) || lists.value[0]
  })

  const currentListInfo = ref(getSelectedList)

  const nextId = computed(() => {
    return lists.value[lists.value.length - 1].id + 1
  })

  function setSelectedList(id: number) {
    selectedList.value = id
  }

  function createList(name: string) {
    lists.value.push({
      id: nextId.value,
      name,
    })
  }

  return { lists, selectedList, currentListInfo, setSelectedList, createList }
})
