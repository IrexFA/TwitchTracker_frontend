<template>
    <div class="bg-gray-800 py-8">
        <div class="container mx-auto relative">
            <div class="flex justify-center relative">
                <!-- Barre de recherche -->
                <input v-model="query" type="text" placeholder="Search for a streamer or game"
                    class="w-full max-w-lg p-2 bg-transparent text-white placeholder-gray-400 border-b border-gray-500 focus:outline-none" />

                <!-- Dropdown -->
                <div v-if="dropdownVisible"
                    class="absolute left-0 top-full mt-2 w-full max-w-lg bg-white text-black shadow-lg rounded-lg overflow-y-auto max-h-64">
                    <ul>
                        <li v-for="game in filteredGames" :key="game.id" class="p-2 cursor-pointer hover:bg-gray-200"
                            @click="$emit('selectGame', game.id)">
                            🎮 {{ game.name }}
                        </li>
                        <li v-for="channel in filteredChannels" :key="channel.id"
                            class="p-2 cursor-pointer hover:bg-gray-200" @click="$emit('selectChannel', channel.id)">
                            🟢 {{ channel.name }}
                        </li>
                        <li v-if="!filteredGames.length && !filteredChannels.length" class="p-2 text-gray-500">
                            No results found
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    games: {
        type: Array,
        required: true,
    },
    channels: {
        type: Array,
        required: true,
    },
});

const query = ref("");
const dropdownVisible = ref(false);
const filteredGames = ref([]);
const filteredChannels = ref([]);

watch(query, (newQuery) => {
    const games = props.games;
    const channels = props.channels;

    dropdownVisible.value = newQuery.length > 0;

    if (newQuery.length === 0) {
        filteredGames.value = [];
        filteredChannels.value = [];
        return;
    }

    filteredGames.value = games.filter((game) =>
        game.name.toLowerCase().includes(newQuery.toLowerCase())
    );

    filteredChannels.value = channels.filter((channel) =>
        channel.name.toLowerCase().includes(newQuery.toLowerCase())
    );

});
</script>
