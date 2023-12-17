<script setup lang="ts">
defineProps({
    task: {
        type: Object,
        default: {}
    }
})
</script>

<template>
    <div class="bg-dark-300 rounded-md px-4 py-2.5">
        <div class="text-lg pb-2">Task Details</div>
        <div class="">
            <div>
                <span>Title: </span>
                <span>{{ task?.title }}</span>
            </div>
        </div>
    </div>
</template>
