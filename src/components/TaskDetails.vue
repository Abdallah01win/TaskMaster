<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps({
    task: {
        type: Object,
        required: true,
        default: {}
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <div class="bg-dark-300 rounded-md px-4 py-4">
        <div class="flex justify-end pb-4">
            <Icon icon="ph-x" class="cursor-pointer" @click="emit('close')"></Icon>
        </div>
        <div>
            <div class="bg-dark-200 rounded-md px-4 py-2.5">
                <span class="text-xl">{{ task?.title }}</span>
            </div>
        </div>
    </div>
</template>
