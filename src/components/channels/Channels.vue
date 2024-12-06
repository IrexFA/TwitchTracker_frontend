<template>
  <div class="p-8">
    <h1 class="text-center text-3xl text-gray-800 mb-4 font-body">TWITCH TOP STREAMERS</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2 italic text-green-600">Followers Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(channel, index) in channels" :key="channel.twitch_channel_id"
          :class="'border-t cursor-pointer transition duration-0 hover:duration-150 hover:bg-gray-100'"
          @click="goToChannelDetails(channel.id)">
          <td class="px-4 py-2">#{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td class="px-4 py-2 flex items-center">
            <img :src="channel.profile_image_url" alt="channel image" class="w-10 h-10 rounded-full mr-2" />
            <span>{{ channel.name }}</span>
          </td>
          <td class="px-4 py-2 text-center text-green-600">
            {{ channel.followers_count }}
          </td>
        </tr>
      </tbody>
    </table>

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
import { ref, onMounted } from "vue";
import api from "../../api";
import { useRouter } from "vue-router";

const router = useRouter();
const channels = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 10;

const fetchPage = async (page) => {
  try {
    const response = await api.get(`/channels?page=${page}`);
    channels.value = response.data.data;
    totalPages.value = response.data.meta.totalPages;
    currentPage.value = page;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

const goToChannelDetails = (channel_id) => {
  router.push({ name: "channel", params: { id: channel_id } });
};

onMounted(() => {
  fetchPage(currentPage.value);
});
</script>
