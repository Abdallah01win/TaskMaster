<script setup lang="ts">
import type { Task } from '@/stores/task'
import { computed, ref, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import Icon from '@/components/Icon.vue'
import DropDown from '@/components/DropDown.vue'
import Dialog from '@/components/Dialog.vue'

const listStore = useListStore()
const { deleteList, renameList } = listStore

const { currentList } = storeToRefs(listStore)

const form = ref<Partial<Task>>({ id: 0, title: '' })
const dropDown = ref<InstanceType<typeof DropDown> | null>(null)
const titleInput = ref<HTMLElement | null>(null)
const isRenameModeActive = ref(false)
const openDialog = ref(false)

watch(
  () => currentList.value.id,
  (newVal) => {
    form.value = { id: newVal, title: currentList.value.name }
    toggleRenameMode(false)
  },
)

const shouldShowTitleInput = computed(() => {
  return currentList.value.id > 5 && isRenameModeActive.value
})

const toggleRenameMode = (edit: boolean) => {
  isRenameModeActive.value = edit
  dropDown.value?.hideOptions()
  if (edit) {
    nextTick(() => {
      titleInput.value?.focus()
    })
  }
}

const saveListTitle = () => {
  const { id, title } = form.value
  if (id && title) {
    renameList(id, title)
    toggleRenameMode(false)
  }
}

const deleteListHandler = () => {
  deleteList(currentList.value.id)
  openDialog.value = false
}
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div>
      <div v-if="!shouldShowTitleInput" class="text-3xl font-semibold">{{ currentList?.name }}</div>
      <form v-else class="relative" @submit.prevent="saveListTitle">
        <input
          ref="titleInput"
          v-model="form.title"
          type="text"
          class="bg-dark-100 rounded-t-md px-4 py-2 text-xl font-semibold outline-none focus:ring-0"
        />
        <div class="flex items-center gap-x-2 absolute right-0 top-[50%] translate-y-[-50%] mr-4">
          <div @click="toggleRenameMode(false)">
            <Icon :icon="'x-bold'" :width="4" />
          </div>
        </div>
      </form>
    </div>
    <span v-if="currentList?.id > 5">
      <DropDown ref="dropDown">
        <template #trigger>
          <Icon :icon="'dots-three-outline-vertical-fill'" />
        </template>

        <template #options>
          <span class="block px-4 py-2.5 hover:bg-dark-300 cursor-pointer" @click="toggleRenameMode(true)">
            Rename
          </span>
          <span class="block px-4 py-2.5 hover:bg-dark-300 cursor-pointer" @click="openDialog = true">
            Delete
          </span>
        </template>
      </DropDown>
    </span>
  </div>

  <Teleport to="body">
    <Dialog
      v-if="currentList?.id > 5 && openDialog"
      title="Are you sure you want to delete this list?"
      msg="This action cannot be undone and will also delete all tasks withing this list!"
      @cancel="openDialog = false"
    >
      <template #action>
        <button class="bg-red-500 px-4 py-2 rounded" @click="deleteListHandler">Delete</button>
      </template>
    </Dialog>
  </Teleport>
</template>
