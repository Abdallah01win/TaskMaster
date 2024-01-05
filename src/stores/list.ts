import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useTaskStore } from './task'
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
  {
    id: 4,
    name: 'Completed',
    icon: 'ph-check-circle',
  },
  {
    id: 5,
    name: 'All Tasks',
    icon: 'ph-list-checks',
  },
]

export const useListStore = defineStore('list', () => {
  const taskStore = useTaskStore()
  const { removeListTasks } = taskStore

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

  function deleteList(id: number) {
    if (!defaultLists.map(({ id }) => id).includes(id)) {
      removeListTasks(id)
      lists.value = lists.value.filter((list) => list.id !== id)
      selectedList.value = defaultLists[0].id
    }
  }

  return { lists, selectedList, currentListInfo, setSelectedList, createList, deleteList }
})
