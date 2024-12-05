<template>
  <div class="p-8">
    <h1 class="text-center text-3xl text-gray-800 mb-4 font-body">TWITCH TOP STREAMERS</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2 italic text-green-600">Avg <br> Viewers</th>
          <th class="px-4 py-2 italic text-red-500">Time <br> Streamed</th>
          <th class="px-4 py-2 italic text-yellow-600">All Time Peak <br> Viewers</th>
          <th class="px-4 py-2 italic text-purple-500">Hours <br> Watched</th>
          <th class="px-4 py-2 italic" style="color: gold;">Rank</th>
          <th class="px-4 py-2 italic text-blue-500">Followers <br> Gained</th>
          <th class="px-4 py-2 italic text-blue-500">Total <br> Followers</th>
          <th class="px-4 py-2 italic text-orange-500">Total <br> Views</th>  
        </tr>
      </thead>
      <tbody>
        <tr v-for="(channel, index) in channels" :key="channel.name"
          :class="'border-t cursor-pointer transition duration-0 hover:duration-150 hover:bg-gray-100'"
          @click="goToChannelDetails(channel.name)">
          <td class="px-4 py-2">#{{ index + 1 }}</td>
          <td class="px-4 py-2 flex items-center">
            <img :src="channel.image" alt="channel image" class="w-10 h-10 rounded-full mr-2" />
            <span>{{ channel.name }}</span>
          </td>
          <td class="px-4 py-2 text-center text-green-600">{{ channel.viewers }}</td>
          <td class="px-4 py-2 text-center text-red-500">{{ channel.streamed }}</td>
          <td class="px-4 py-2 text-center text-yellow-600">{{ channel.totalViewers }}</td>
          <td class="px-4 py-2 text-center text-purple-500">{{ channel.watched }}</td>
          <td class="px-4 py-2 text-center">{{ channel.rank }}</td>
          <td class="px-4 py-2 text-center text-blue-500">{{ channel.gained }}</td>
          <td class="px-4 py-2 text-center text-blue-500">{{ channel.followers }}</td>
          <td class="px-4 py-2 text-center text-orange-500">{{ channel.views }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const channels = ref([
  {
    name: "DOTA2TI",
    image: "https://via.placeholder.com/40", // Placeholder image URL
    viewers: "97,473",
    streamed: "119.8 hours",
    totalViewers: "535,805",
    watched: "11.7M",
    rank: 1,
    gained: "+66.7K",
    followers: "1.28M",
    views: "258M",
  },
  {
    name: "DOTA2TI_RU",
    image: "https://via.placeholder.com/40",
    viewers: "87,022",
    streamed: "117.5 hours",
    totalViewers: "845,224",
    watched: "10.2M",
    rank: 2,
    gained: "+90.1K",
    followers: "1.03M",
    views: "182M",
  },
]);

const goToChannelDetails = (name) => {
  router.push({ name: 'channel', params: { name } });
}

</script>

<style scoped>
/* Ajoute des styles ici si nécessaire */
</style>
