<template>
    <div class="bg-gray-800">
        <div class="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <div class="text-center">
                <h2 class="text-2xl font-bold">{{ totalViewers.toLocaleString() }}</h2>
                <p class="text-sm text-gray-400">Viewers watching</p>
            </div>
            <div class="text-center">
                <h2 class="text-2xl font-bold">{{ totalChannels.toLocaleString() }}</h2>
                <p class="text-sm text-gray-400">Channels broadcasting</p>
            </div>
            <div class="text-center">
                <h2 class="text-2xl font-bold">{{ uniqueGames.toLocaleString() }}</h2>
                <p class="text-sm text-gray-400">Unique games live</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(["totalViewers", "totalChannels", "uniqueGames"]);
</script>