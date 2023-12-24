<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { formatDate } from '@/helpers/index'
import { useTaskStore } from '@/stores/task'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: {},
  },
})

const emit = defineEmits(['close'])

const taskStore = useTaskStore()
const { setTaskInfo } = taskStore

const showDateInput = ref(false)
const form = ref({
  description: '',
  dueDate: '',
})

const minDate = new Date().toISOString().split('T')[0]

watch(
  () => props.task,
  (newVal) => {
    if (newVal) {
      form.value = { description: newVal.description, dueDate: newVal.dueDate }
    }
  },
)

const saveInfo = () => {
  setTaskInfo(props.task?.id, form.value)
}
</script>

<template>
  <div class="bg-dark-300 rounded-md px-4 py-4">
    <div class="flex justify-end pb-4">
      <Icon icon="ph-x" class="cursor-pointer" @click="emit('close')"></Icon>
    </div>

    <div class="flex flex-col gap-y-2.5">
      <div class="bg-dark-200 rounded-md px-4 py-2.5">
        <span>{{ task?.title }}</span>
      </div>

      <div class="bg-dark-200 rounded-md px-4 py-2.5 flex items-center justify-between">
        <!-- <span>{{ formatDate(task?.createdAt).date }}</span>
                <span>{{ formatDate(task?.createdAt).time }}</span> -->
      </div>
      <div class="bg-dark-200 rounded-md px-4 py-2.5">
        <span v-if="task?.description">{{ task?.description ?? 'Description' }}</span>
        <input
          v-else
          v-model="form.description"
          type="text"
          class="bg-transparent focus:outline-none"
          name="description"
          placeholder="Description"
          @keypress.enter="saveInfo"
        />
      </div>

      <div class="bg-dark-200 rounded-md px-4 py-2.5">
        <span v-if="task?.dueDate">{{ formatDate(task?.dueDate).date }}</span>
        <input
          v-else
          :type="'date'"
          placeholder="Due Date"
          :min="minDate"
          v-model="form.dueDate"
          @change="saveInfo"
          class="bg-transparent focus:outline-none text-gray-300"
        />
      </div>
    </div>
  </div>
</template>
