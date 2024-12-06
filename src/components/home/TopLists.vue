<template>
    <div class="bg-white text-gray-900 py-12">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Top Streamed Games -->
            <div>
                <table class="min-w-full table-auto text-sm">
                    <thead class="border-gray-200">
                        <tr>
                            <th class="px-4 py-2 text-left">Top Streamed Games</th>
                            <th class="px-4 py-2 text-left">Viewers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in topGames" :key="game.id"
                            class="cursor-pointer transition duration-150 hover:bg-gray-100"
                            @click="$emit('selectGame', game.id)">
                            <td class="px-4 py-2 flex items-center">
                                <img :src="adjustImageUrl(game.image_url)" class="w-10 h-12 mr-2" alt="game image" />
                                {{ game.name }}
                            </td>
                            <td class="px-4 py-2">{{ game.currentViewers.toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Top Live Channels -->
            <div>
                <table class="min-w-full table-auto text-sm">
                    <thead class="border-gray-200">
                        <tr>
                            <th class="px-4 py-2 text-left">Top Live Channels</th>
                            <th class="px-4 py-2 text-left">Viewers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="channel in activeChannels" :key="channel.id"
                            class="cursor-pointer transition duration-150 hover:bg-gray-100"
                            @click="$emit('selectChannel', channel.id)">
                            <td class="px-4 py-2 flex items-center">
                                <img :src="channel.image_url" class="w-10 h-10 rounded-full mr-2" alt="channel image" />
                                {{ channel.name }}
                            </td>
                            <td class="px-4 py-2">{{ channel.currentViewers.toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
const adjustImageUrl = (url) => url.replace("{width}", "280").replace("{height}", "280");

defineProps(["topGames", "activeChannels"]);
</script>