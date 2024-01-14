<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { initTask } from '@/helpers'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  selectedList: {
    type: Number,
    required: true,
  },
})

const tasksStore = useTaskStore()

const { nextId } = storeToRefs(tasksStore)
const { addTask } = tasksStore

const todoItem = ref('')

const create = () => {
  if (todoItem.value.trim() !== '') {
    addTask({
      id: nextId.value,
      listId: props.selectedList,
      title: todoItem.value,
      ...initTask(props.selectedList),
    })

    todoItem.value = ''
  }
}
</script>

<template>
  <div class="bg-dark-100 rounded-md px-5 py-4">
    <form @submit.prevent="create" class="flex items-center gap-x-4">
      <Icon :icon="'circle'" :isClickable="false" />
      <input
        v-model="todoItem"
        type="text"
        name="title"
        placeholder="Add a task"
        class="bg-transparent text-white w-full focus:outline-none"
      />

      <button
        class="flex items-center gap-x-2 py-2 px-4 bg-lightGreen text-dark-100 rounded font-semibold hover:scale-[1.05] active:scale-[0.95] transition-all"
        title="Add new task"
        @click="create"
      >
        <span>Add</span>
        <Icon :icon="'arrow-up-bold'" :width="'4'" />
      </button>
    </form>
  </div>
</template>
