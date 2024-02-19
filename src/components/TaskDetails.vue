<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatDate } from '@/helpers/index'
import { useTaskStore } from '@/stores/task'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const emit = defineEmits(['close'])

const taskStore = useTaskStore()
const { setTaskInfo, removeTask } = taskStore

const minDate = new Date().toISOString().split('T')[0]

const form = ref({
  description: '',
  dueDate: '',
})

watch(
  () => props.task,
  (newVal) => {
    if (newVal) {
      const { description, dueDate } = newVal
      form.value = { description, dueDate }
    }
  },
)

const saveInfo = () => {
  setTaskInfo(props.task?.id, form.value)
}

const deleteTask = (id: number) => {
  removeTask(id)
  emit('close')
}
</script>

<template>
  <div>
    <div class="bg-dark-300 rounded-md px-4 py-4">
      <div class="flex justify-end pb-4">
        <Icon :icon="'x'" @click="emit('close')" />
      </div>

      <div class="flex flex-col gap-y-2.5">
        <div class="bg-dark-200 rounded-md px-4 py-2.5">
          <span>{{ task?.title }}</span>
        </div>

        <div class="bg-dark-200 rounded-md px-4 py-2.5 flex items-center justify-between">
          <span>{{ formatDate(task?.createdAt).date }}</span>
          <span>{{ formatDate(task?.createdAt).time }}</span>
        </div>

        <div class="bg-dark-200 rounded-md px-4 py-2.5">
          <span v-if="task?.description">{{ task?.description ?? 'Description' }}</span>
          <input
            v-else
            v-model="form.description"
            type="text"
            class="bg-transparent focus:outline-none w-full"
            name="description"
            placeholder="Description"
            @keypress.enter="saveInfo"
          />
        </div>

        <div class="bg-dark-200 rounded-md px-4 py-2.5">
          <div v-if="task?.dueDate" class="flex items-center justify-between">
            <span>{{ formatDate(task?.dueDate).date }}</span>
            <span>{{ formatDate(task?.dueDate).time }}</span>
          </div>

          <input
            v-else
            class="bg-transparent focus:outline-none text-gray-300 w-full"
            name="due_date"
            placeholder="Due Date"
            type="text"
            onfocus="(this.type='datetime-local')"
            :min="minDate"
            v-model="form.dueDate"
            @change="saveInfo"
          />
        </div>

        <button
          id="delete"
          class="grid place-content-center p-2 w-fit ml-auto mt-1.5 bg-dark-200 rounded-full hover:bg-red-500"
          title="Delete task."
          @click="deleteTask(task?.id)"
        >
          <Icon :icon="'trash'" :width="4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='datetime-local']::-webkit-calendar-picker-indicator {
  color: white;
  opacity: 1;
  display: block;
  background: url('@/assets/icons/calendarIcon.svg') no-repeat;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
