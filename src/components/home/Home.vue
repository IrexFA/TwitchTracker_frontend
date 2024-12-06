<template>
    <div class="min-h-screen text-white">
        <SearchBar :games="allGames" :channels="searchChannels" @selectGame="goToGameDetails"
            @selectChannel="goToChannelDetails" />

        <Statistics :totalViewers="totalViewers" :totalChannels="totalChannels" :uniqueGames="uniqueGames" />

        <TopLists :topGames="topGames" :activeChannels="activeChannels" @selectGame="goToGameDetails"
            @selectChannel="goToChannelDetails" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import { useRouter } from "vue-router";

import SearchBar from "./SearchBar.vue";
import Statistics from "./Statistics.vue";
import TopLists from "./TopLists.vue";

const router = useRouter();
const totalViewers = ref(0);
const totalChannels = ref(0);
const uniqueGames = ref(0);
const allGames = ref([]);
const searchChannels = ref([]);
const topGames = ref([]);
const activeChannels = ref([]);

const fetchAllChannels = async () => {
    try {
        const firstResponse = await api.get(`/channels?page=1`);
        const { data: firstPageData, meta } = firstResponse.data;

        const totalPages = meta.totalPages;

        const promises = [];
        for (let page = 2; page <= totalPages; page++) {
            promises.push(api.get(`/channels?page=${page}`));
        }

        const responses = await Promise.all(promises);

        const allChannels = [
            ...firstPageData,
            ...responses.flatMap((response) => response.data.data),
        ];

        return allChannels;
    } catch (error) {
        console.error("Error fetching channels:", error);
        return [];
    }
};



const fetchAllData = async () => {
    try {
        const gamesResponse = await api.get("/games?limit=200");
        const activeChannelsResponse = await api.get("/channels/active");

        allGames.value = gamesResponse.data.data;
        uniqueGames.value = allGames.value.length;
        totalViewers.value = allGames.value.reduce((sum, game) => sum + game.currentViewers, 0);

        topGames.value = allGames.value
            .sort((a, b) => b.currentViewers - a.currentViewers)
            .slice(0, 10);


        activeChannels.value = activeChannelsResponse.data
            .sort((a, b) => b.currentViewers - a.currentViewers)
            .slice(0, 10);

        totalChannels.value = allGames.value.reduce(
            (sum, game) => sum + (game.totalStreams || 0),
            0
        );

        searchChannels.value = await fetchAllChannels();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const goToGameDetails = (gameId) => {
    router.push({ name: "game", params: { id: gameId } });
};

const goToChannelDetails = (channelId) => {
    router.push({ name: "channel", params: { id: channelId } });
};

onMounted(() => {
    fetchAllData();
});
</script>