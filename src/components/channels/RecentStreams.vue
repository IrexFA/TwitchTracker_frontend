<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Recent Streams</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="stream in streams" :key="stream.streamId"
                class="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold">{{ stream.start }}</span>
                </div>
                <div class="flex items-center justify-between mb-2">
                    <div class="flex flex-col items-center">
                        <span class="text-green-500 font-semibold">{{ stream.maxViewers }}</span>
                        <span class="text-xs text-gray-500">Max Viewers</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-blue-500 font-semibold">{{ stream.followersGained }}</span>
                        <span class="text-xs text-gray-500">Followers Gained</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-gray-900 font-semibold">
                            {{ stream.end === null ? 'In live 🔴' : `${stream.hoursStreamed}h` }}
                        </span>
                        <span class="text-xs text-gray-500">
                            {{ stream.end === null ? 'Currently streaming' : 'Time Streamed' }}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    streams: {
        type: Array,
        required: true,
    },
});
</script>