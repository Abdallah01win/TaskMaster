<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { storeToRefs } from "pinia"
import { useListStore } from '@/stores/list';
import { ref } from "vue";

const listsStore = useListStore();
const { lists, selectedList } = storeToRefs(listsStore);
const { setSelectedList, createList } = listsStore

const showInput = ref(false)
const newListName = ref('')

const createNewList = (name: string) => {
  if (newListName.value) {
    createList(name)
    newListName.value = ''
  }
}
</script>

<template>
  <nav class="px-4 flex items-center justify-between py-2 bg-dark-100 h-[var(--nav-height)]">
    <div>TodoApp</div>
  </nav>
  <section class="flex h-[var(--main-height)] w-full border-t border-gray-700/40">
    <aside class="bg-dark-100 w-60 flex flex-col">
      <ul class="text-sm">
        <li v-for="list in lists" :key="list.id"
          class="flex items-center gap-x-2 py-2 px-4 border-b border-gray-700/40 hover:bg-dark-200"
          :class="selectedList === list.id ? 'bg-dark-200' : ''" @click="setSelectedList(list.id)">
          <span>
            <Icon :icon="list.icon" />
          </span>
          <span>{{ list.name }}</span>
        </li>
      </ul>

      <div class="mt-auto">
        <div class="py-3 px-4 border-t border-gray-700/40">
          <div v-show="!showInput" class="flex items-center gap-x-4 cursor-pointer" @click="showInput = true">
            <span>
              <Icon icon="ph-plus" />
            </span>
            <span>Add new list</span>
          </div>

          <div v-show="showInput" class="flex items-center gap-x-4">
            <div @click="showInput = false" class="cursor-pointer">
              <Icon icon="ph-x" />
            </div>
            <form @submit.prevent="createNewList(newListName)" class="shrink">
              <input v-model="newListName" type="text" name="listName" placeholder="Add new list"
                class="w-full px-2 bg-transparent text-white focus:outline-none" />
            </form>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 px-10 py-8">
      <slot name="tab"></slot>
    </div>
  </section>
</template>
