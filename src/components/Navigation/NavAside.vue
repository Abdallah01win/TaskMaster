<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import { Icon } from '@iconify/vue'

const listsStore = useListStore()
const { lists, selectedList } = storeToRefs(listsStore)
const { setSelectedList, createList } = listsStore

const showInput = ref(false)
const listInput = ref(null)
const newListName = ref('')

const ToggleInputDisplay = () => {
  showInput.value = !showInput.value
}

const createNewList = (name: string) => {
  if (newListName.value) {
    createList(name)
    newListName.value = ''
  }
}

const isCurrentList = (id: number) => selectedList.value === id
</script>
<template>
  <aside class="bg-dark-100 w-60 flex flex-col">
    <ul class="text-sm">
      <li
        v-for="list in lists"
        :key="list.id"
        class="flex items-center relative gap-x-2.5 py-2 px-4 border-b border-ash-100 hover:bg-dark-200"
        @click="setSelectedList(list.id)"
      >
        <span v-show="isCurrentList(list.id)" class="absolute left-0 w-0.5 h-full bg-lightGreen"></span>
        <span>
          <Icon :icon="list.icon" class="w-4 h-4" />
        </span>
        <span>{{ list.name }}</span>
      </li>
    </ul>

    <div class="mt-auto">
      <div class="py-3 px-4 border-t border-ash-100">
        <div class="flex items-center gap-x-3">
          <div @click="ToggleInputDisplay" class="cursor-pointer">
            <Icon :icon="showInput ? 'ph-x' : 'ph-list-plus'" class="w-5 h-5" />
          </div>
          <form v-show="showInput" @submit.prevent="createNewList(newListName)" class="shrink">
            <input
              ref="listInput"
              v-model="newListName"
              type="text"
              name="listName"
              placeholder="Add new list"
              class="w-full bg-transparent text-white focus:outline-none"
            />
          </form>
          <span v-show="!showInput">Add new list</span>
        </div>
      </div>
    </div>
  </aside>
</template>
