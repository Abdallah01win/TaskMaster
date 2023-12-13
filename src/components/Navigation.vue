<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PhX, PhPlus } from "@phosphor-icons/vue"
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
        <li v-for="list in lists" :key="list.id" class="py-2 px-4 border-b border-gray-700/40 hover:bg-dark-200"
          :class="selectedList === list.id ? 'bg-dark-200' : ''" @click="setSelectedList(list.id)">
          <span>{{ list.name }}</span>
        </li>
      </ul>

      <div class="mt-auto">
        <div class="py-3 px-4 border-t border-gray-700/40">
          <div v-show="!showInput" class="flex items-center gap-x-4 cursor-pointer" @click="showInput = true">
            <span><ph-plus :size="18" /></span>
            <span>Add new list</span>
          </div>

          <div v-show="showInput" class="flex items-center gap-x-4">
            <div @click="showInput = false" class="cursor-pointer">
              <ph-x :size="18" />
            </div>
            <form @submit.prevent="createNewList(newListName)" class="shrink">
              <input v-model="newListName" type="text" name="listName" placeholder="Add new list"
                class="text-black w-full px-2" />
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
