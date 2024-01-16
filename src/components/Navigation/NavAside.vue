<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import Icon from '@/components/Icon.vue'

const listsStore = useListStore()
const { lists, selectedList } = storeToRefs(listsStore)
const { setSelectedList, createList } = listsStore

const listInput = ref<HTMLElement | null>(null)
const showInput = ref(false)
const newListName = ref('')

const ToggleInputDisplay = () => {
  showInput.value = !showInput.value
  if (!showInput.value) {
    newListName.value = ''
  } else {
    nextTick(() => {
      listInput.value?.focus()
    })
  }
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
        class="flex items-center relative gap-x-2.5 py-2 px-4 border-b border-ash-100 hover:bg-dark-200 cursor-pointer"
        @click="setSelectedList(list.id)"
      >
        <span v-show="isCurrentList(list.id)" class="absolute left-0 w-0.5 h-full bg-lightGreen"></span>
        <span>
          <Icon :icon="list.icon" :width="4" />
        </span>
        <span>{{ list.name }}</span>
      </li>
    </ul>

    <div class="mt-auto">
      <div class="py-3 px-4 border-t border-ash-100">
        <div class="flex items-center gap-x-3">
          <Icon :icon="showInput ? 'x' : 'list-plus'" @click="ToggleInputDisplay" />
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
