<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useListStore } from '@/stores/list';
import { ref } from "vue";

const listsStore = useListStore();
const { lists } = storeToRefs(listsStore);
const { setSelectedList, createList } = listsStore

const showInput = ref(false)
const newListName = ref('')

const createNewList = (name: string) => {
  createList(name)
  newListName.value = ''
}
</script>

<template>
  <nav class="px-4 flex items-center justify-between py-2 bg-dark-100 h-[var(--nav-height)]">
    <div>TodoApp</div>
  </nav>
  <section class="flex h-[var(--main-height)] w-full">
    <aside class="bg-dark-100 w-60 flex flex-col">
      <ul>
        <li v-for="list in lists" :key="list.id" class="py-2 px-4 border-b border-gray-100/30 hover:bg-dark-200"
          @click="setSelectedList(list.id)">
          <span>{{ list.name }}</span>
        </li>
      </ul>

      <div class="mt-auto">
        <div v-show="!showInput" class="py-4 px-4">
          <div class="flex items-center gap-x-6 cursor-pointer" @click="showInput = true">
            <span>+</span>
            <span>Add new list</span>
          </div>
        </div>

        <div v-show="showInput" class="py-4 px-4">
          <div class="flex items-center gap-x-4">
            <form @submit.prevent="createNewList(newListName)" class="shrink">
              <input v-model="newListName" type="text" name="listName" class="text-black w-full" />
            </form>
            <div @click="showInput = false" class="cursor-pointer">X</div>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 p-8">
      <slot name="tab"></slot>
    </div>
  </section>
</template>
