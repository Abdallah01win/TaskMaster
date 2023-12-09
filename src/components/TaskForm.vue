<script setup lang="ts">
import { ref } from "vue"
import { useTaskStore } from "@/stores/task"
import { useListStore } from "@/stores/list";
import { storeToRefs } from "pinia"

const tasksStore = useTaskStore()
const listsStore = useListStore()

const { nextId } = storeToRefs(tasksStore)
const { selectedList } = storeToRefs(listsStore)
const { addTask } = tasksStore

const todoItem = ref("")

const create = () => {
    addTask({
        id: nextId.value,
        listId: selectedList.value,
        title: todoItem.value,
        completed: false,
    })

    todoItem.value = ""
}
</script>
<template>
    <div class="bg-dark-300 rounded-xl p-6">
        <form @submit.prevent="create">
            <input v-model="todoItem" type="text" name="title" placeholder="Add a task" class="text-black w-full" />
        </form>
    </div>
</template>