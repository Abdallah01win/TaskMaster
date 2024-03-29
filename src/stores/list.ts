import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useTaskStore } from './task'
import { capitalize } from '@/helpers'
import { defaultLists } from '@/constants'
import type { List } from '@/types'

export const useListStore = defineStore('list', () => {
  const taskStore = useTaskStore()

  const lists = ref<List[]>([...defaultLists])
  const selectedList = ref<number>(defaultLists[0].id)

  const getSelectedList = computed(() => {
    const list = lists.value.find(({ id }) => id === selectedList.value)
    return list || lists.value[0]
  })

  const currentList = ref<ComputedRef<List>>(getSelectedList)

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
      icon: 'list',
    })
  }

  function renameList(id: number, name: string) {
    const list = lists.value.find((list) => list.id === id)
    if (list) {
      list.name = capitalize(name)
    }
  }

  function deleteList(id: number) {
    if (!defaultLists.map(({ id }) => id).includes(id)) {
      const { removeListTasks } = taskStore

      removeListTasks(id)
      lists.value = lists.value.filter((list) => list.id !== id)
      selectedList.value = defaultLists[0].id
    }
  }

  return { lists, selectedList, currentList, setSelectedList, createList, renameList, deleteList }
})
