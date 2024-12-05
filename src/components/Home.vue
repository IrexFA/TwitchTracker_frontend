<template>
    <div class="min-h-screen text-white">

        <div class="bg-gray-800 py-8">
            <div class="container mx-auto flex justify-center">
                <input type="text" placeholder="Search for a streamer or game"
                    class="w-full max-w-lg p-2 bg-transparent text-white placeholder-gray-400 border-b border-gray-500 focus:outline-none" />
                <button class="ml-4 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg">
                    🔍
                </button>
            </div>
        </div>

        <div class="bg-gray-800">
            <div class="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                <div class="text-center">
                    <h2 class="text-2xl font-bold">2,268,817</h2>
                    <p class="text-sm text-gray-400">Viewers watching</p>
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-bold">63,930</h2>
                    <p class="text-sm text-gray-400">Channels broadcasting</p>
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-bold">2,288,068</h2>
                    <p class="text-sm text-gray-400">Concurrent viewers</p>
                </div>
            </div>
        </div>

        <div class="bg-white text-gray-900 py-12">
            <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <table class="min-w-full table-auto text-sm">
                        <thead class="border-gray-200">
                            <tr>
                                <th class="px-4 py-2 text-left">Top Streams of the Week</th>
                                <th class="px-4 py-2 text-left">Peak Viewers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="stream in topStreams" :key="stream.name" class="">
                                <td class="px-4 py-2 flex items-center">
                                    <img :src="stream.image" class="w-8 h-8 rounded-full mr-2" alt="streamer image" />
                                    {{ stream.name }}
                                </td>
                                <td class="px-4 py-2">{{ stream.peakViewers }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Top Channels -->
                <div>
                    <table class="min-w-full table-auto text-sm">
                        <thead class=" border-gray-200">
                            <tr>
                                <th class="px-4 py-2 text-left">Top Live Channels</th>
                                <th class="px-4 py-2 text-left">Viewers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="channel in topChannels" :key="channel.name" class="">
                                <td class="px-4 py-2 flex items-center">
                                    <img :src="channel.image" class="w-8 h-8 rounded-full mr-2" alt="channel image" />
                                    {{ channel.name }}
                                </td>
                                <td class="px-4 py-2">{{ channel.viewers }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Exemple de données pour les top streams
const topStreams = ref([
    { name: 'eslcs', image: 'https://via.placeholder.com/40', peakViewers: '168,349' },
    { name: 'ibai', image: 'https://via.placeholder.com/40', peakViewers: '137,791' },
    { name: 'caedrel', image: 'https://via.placeholder.com/40', peakViewers: '127,054' },
    { name: 'riotgames', image: 'https://via.placeholder.com/40', peakViewers: '112,387' },
    { name: 'ballerleague', image: 'https://via.placeholder.com/40', peakViewers: '105,646' },
]);

// Exemple de données pour les top live channels
const topChannels = ref([
    { name: 'Caedrel', image: 'https://via.placeholder.com/40', viewers: '76,005' },
    { name: 'Riot Games', image: 'https://via.placeholder.com/40', viewers: '61,318' },
    { name: 'Ibai', image: 'https://via.placeholder.com/40', viewers: '51,865' },
    { name: 'BLASTPremier', image: 'https://via.placeholder.com/40', viewers: '48,827' },
    { name: 'Echo_Esports', image: 'https://via.placeholder.com/40', viewers: '35,780' },
]);
</script>

<style scoped>
/* Styles supplémentaires pour personnaliser */
body {
    font-family: 'Arial', sans-serif;
}
</style>