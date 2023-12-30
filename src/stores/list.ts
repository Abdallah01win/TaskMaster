import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { capitalize } from '@/helpers/index'

export interface List {
  id: number
  name: string
  icon: string
}

const defaultLists: List[] = [
  {
    id: 1,
    name: 'My Day',
    icon: 'ph-sun',
  },
  {
    id: 2,
    name: 'Important',
    icon: 'ph-warning-circle',
  },
  {
    id: 3,
    name: 'Favorites',
    icon: 'ph-star',
  },
]

export const useListStore = defineStore('list', () => {
  const lists = ref<List[]>([...defaultLists])
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
      name: capitalize(name),
      icon: 'ph-list',
    })
  }

  return { lists, selectedList, currentListInfo, setSelectedList, createList }
})
