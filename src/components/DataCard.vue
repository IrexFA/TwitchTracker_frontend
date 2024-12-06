<template>
    <div class="bg-gray-700 rounded p-2">
        <div class="flex flex-col justify-end items-end">
            <h2 class="text-lg font-bold text-white">{{ name }}</h2>
            <span class="text-2xl font-bold text-white">{{ data }}</span>
            <span v-if="alt" class="text-green-500">{{ alt }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    data: String,
    alt: String,
});

</script>