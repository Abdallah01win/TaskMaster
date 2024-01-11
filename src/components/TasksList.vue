<script setup lang="ts">
import type { Task } from '@/stores/task'
import { ref, watch, computed, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/task'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import DropDown from '@/components/DropDown.vue'
import Dialog from '@/components/Dialog.vue'
import TaskForm from './TaskForm.vue'
import TaskDetails from './TaskDetails.vue'

const tasksStore = useTaskStore()
const listStore = useListStore()

const { tasksList } = storeToRefs(tasksStore)
const { currentListInfo } = storeToRefs(listStore)
const { deleteList, renameList } = listStore
const { completeTask, favoriteTask, importantTask } = tasksStore

const dropDown = ref<InstanceType<typeof DropDown> | null>(null)
const titleInput = ref<HTMLElement | null>(null)
const form = ref<Partial<Task>>({ id: 0, title: '' })
const selectedTask = ref<Task | null>(null)
const openDialog = ref(false)
const isRenameModeActive = ref(false)

watch(
  () => currentListInfo.value.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      form.value = { id: newVal, title: currentListInfo.value.name }
      toggleRenameMode(false)
      resetSelectedTask()
    }
  },
)

const shouldShowTitleInput = computed(() => {
  return currentListInfo.value.id > 5 && isRenameModeActive.value
})

const resetSelectedTask = () => {
  selectedTask.value = null
}

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
</script>

<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between mb-4">
      <div>
        <div v-if="!shouldShowTitleInput" class="text-3xl font-semibold">{{ currentListInfo?.name }}</div>
        <form v-else="shouldShowTitleInput" class="relative">
          <input
            ref="titleInput"
            v-model="form.title"
            type="text"
            class="bg-dark-100 rounded-t-md px-4 py-2 text-xl font-semibold outline-none focus:ring-0"
            @keypress.enter="saveListTitle"
          />
          <div class="flex items-center gap-x-2 absolute right-0 top-[50%] translate-y-[-50%] mr-4">
            <div @click="toggleRenameMode(false)">
              <Icon icon="ph-x-bold" class="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </form>
      </div>
      <span v-if="currentListInfo?.id > 5">
        <DropDown ref="dropDown">
          <template #trigger>
            <Icon icon="ph-dots-three-outline-vertical-fill" class="w-5 h-5 cursor-pointer" />
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
    <div
      class="grid overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thumb-ash-200 scrollbar-track-dark-300 pr-3"
      :class="selectedTask ? 'grid-cols-[1fr_.6fr] gap-x-3' : 'grid-cols-1 gap-x-0'"
    >
      <div class="taskList">
        <div class="flex flex-col gap-y-3">
          <div v-show="!tasksList.length" class="text-center text-gray-400 mt-6">
            No tasks in {{ currentListInfo?.name }}! Add some to get started.
          </div>
          <div
            v-for="task in tasksList"
            :key="task.id"
            class="flex items-center justify-between bg-dark-300 rounded-md px-4 py-2.5 cursor-pointer"
            @click.self="selectedTask = task"
          >
            <div class="flex items-center">
              <div class="cursor-pointer mr-2" @click="completeTask(task?.id)">
                <span :title="task?.completed ? 'Restore task' : 'Complete task'">
                  <Icon :icon="task?.completed ? 'ph-check-circle-fill' : 'ph-circle'" class="w-4 h-4" />
                </span>
              </div>

              <div :class="task?.completed ? 'line-through text-white/40' : ''">
                {{ task?.title }}
              </div>
            </div>
            <div class="flex items-center gap-x-3">
              <span
                @click="importantTask(task?.id)"
                :title="task?.important ? 'Remove from important' : 'Important'"
              >
                <Icon :icon="task?.important ? 'ph-tag-chevron-fill' : 'ph-tag-chevron'" class="w-5 h-5" />
              </span>
              <span
                @click="favoriteTask(task?.id)"
                :title="task?.favorite ? 'Remove from favorites' : 'Add to favorites'"
              >
                <Icon :icon="task?.favorite ? 'ph-star-fill' : 'ph-star'" class="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <TaskDetails v-show="selectedTask" :task="selectedTask ?? {}" @close="resetSelectedTask" />
    </div>
    <TaskForm class="mt-auto" :selected-list="currentListInfo?.id" />
  </div>

  <Teleport to="body">
    <Dialog
      v-if="currentListInfo?.id > 5 && openDialog"
      title="Are you sure you want to delete this list?"
      msg="This action cannot be undone and will also delete all tasks withing this list!"
      @cancel="openDialog = false"
    >
      <template #action>
        <button class="bg-red-500 px-4 py-2 rounded" @click="deleteList(currentListInfo?.id)">Delete</button>
      </template>
    </Dialog>
  </Teleport>
</template>
