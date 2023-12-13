<script setup lang="ts">
import { ref } from "vue"
import { useTaskStore } from "@/stores/task"
import { storeToRefs } from "pinia"
import { capitalize } from "@/helpers/index"

const props = defineProps({
    selectedList: {
        type: Number,
        required: true
    }
})

const tasksStore = useTaskStore()

const { nextId } = storeToRefs(tasksStore)
const { addTask } = tasksStore

const todoItem = ref("")

const create = () => {
    addTask({
        id: nextId.value,
        listId: props.selectedList,
        title: capitalize(todoItem.value),
        completed: false,
    })

    todoItem.value = ""
}
</script>
<template>
    <div class="bg-dark-300 rounded-md p-5">
        <form @submit.prevent="create">
            <input v-model="todoItem" type="text" name="title" placeholder="Add a task" class="text-black w-full" />
        </form>
    </div>
</template>