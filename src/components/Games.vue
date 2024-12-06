<template>
    <div class="p-8">
        <h1 class="text-center text-3xl text-gray-800 mb-4 font-body">MOST WATCHED GAMES ON TWITCH</h1>
        <table class="min-w-full table-auto">
            <thead>
                <tr>
                    <th class=""></th>
                    <th class=""></th>
                    <th class="px-4 py-2">Current <br> viewers</th>
                    <th class="px-4 py-2">Total <br> streams</th>
                    <th class="px-4 py-2">TWITCH <br> SHARE</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(game, index) in data" :key="game.id"
                    :class="'border-t cursor-pointer transition hover:duration-150 hover:bg-gray-100'"
                    @click="goToGameDetails(game.id)">
                    <td class="px-4 py-2 text-center">#{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                    <td class="px-4 py-2 flex items-center">
                        <img :src="game.image_url" alt="game image" class="w-10 h-full mr-2" />
                        <span>{{ game.name }}</span>
                    </td>
                    <td class="px-4 py-2 text-center font-bold text-gray-900">{{ game.currentViewers }}</td>
                    <td class="px-4 py-2 text-center">{{ game.totalStreams }}</td>
                    <td class="px-4 py-2 text-center">{{ game.twitchShare }}%</td>
                </tr>
            </tbody>
        </table>

        <!-- footer -->
        <div class="flex justify-center mt-4 space-x-2">
            <button :disabled="currentPage === 1" @click="fetchPage(currentPage - 1)"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
            </button>
            <span class="px-4 py-2 text-gray-800">{{ currentPage }} / {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="fetchPage(currentPage + 1)"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import api from '../api';
import router from '../router';

const data = ref([
    {
        id: 18,
        name: "Just Chatting",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/509658-210x280.jpg",
        currentViewers: 453780,
        totalStreams: 5208,
        twitchShare: 7.93
    },
    {
        id: 138,
        name: "Path of Exile 2",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/1702520304_IGDB-210x280.jpg",
        currentViewers: 385392,
        totalStreams: 1645,
        twitchShare: 6.74
    },
    {
        id: 14,
        name: "Grand Theft Auto V",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-210x280.jpg",
        currentViewers: 306291,
        totalStreams: 3034,
        twitchShare: 5.36
    },
    {
        id: 20,
        name: "Fortnite",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/33214-210x280.jpg",
        currentViewers: 298298,
        totalStreams: 15680,
        twitchShare: 5.22
    },
    {
        id: 15,
        name: "League of Legends",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/21779-210x280.jpg",
        currentViewers: 188056,
        totalStreams: 2606,
        twitchShare: 3.29
    },
    {
        id: 141,
        name: "Marvel Rivals",
        image_url: "https://static-cdn.jtvnw.net/ttv-boxart/1264310518_IGDB-210x280.jpg",
        currentViewers: 138268,
        totalStreams: 4979,
        twitchShare: 2.42
    },
]);

const goToGameDetails = (id) => {
    router.push({ name: 'game', params: { id } });
}


const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 20;
const fetchPage = (page) => api.get(`/games?page=${page}&limit=${itemsPerPage}`)
    .then((response) => {
        data.value = response.data.data;
        totalPages.value = response.data.meta.totalPages;
        currentPage.value = page;
    }).catch((error) => {
        console.error("Error while fetching data:", error);
    });

fetchPage(1);
</script>