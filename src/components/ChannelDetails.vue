<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Channel: {{ channel.name }}</h1>
    <div class="flex items-center mb-6">
      <img :src="channel.image_url" alt="Profile Picture" class="w-20 h-20 rounded-full mr-4" />
      <div>
        <p class="text-lg font-semibold">Followers: {{ channel.followers_count }}</p>
      </div>
    </div>

    <div v-if="isLoading">
      <p>Loading channel details...</p>
    </div>
    <div v-else>
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>


    <div>
      <h2 class="text-2xl font-semibold mb-4">Recent Streams</h2>
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2 border">Stream ID</th>
            <th class="px-4 py-2 border">Start Date</th>
            <th class="px-4 py-2 border">End Date</th>
            <th class="px-4 py-2 border">Viewers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stream in channel.streams" :key="stream.id" class="hover:bg-gray-100">
            <td class="px-4 py-2 border">{{ stream.id }}</td>
            <td class="px-4 py-2 border">{{ formatDate(stream.start_date) }}</td>
            <td class="px-4 py-2 border">{{ formatDate(stream.end_date) }}</td>
            <td class="px-4 py-2 border">{{ getAverageViewers(stream.streams_records) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



const route = useRoute();

const id = computed(() => route.params.id);
const channel = ref({});
const chartData = ref({});
const chartOptions = ref({});

const isLoading = ref(true);

const fetchChannelDetails = async () => {
  const channelId = route.params.id;
  try {
    const response = await axios.get(`https://twitchtracker-production.up.railway.app/channels/${channelId}`);
    channel.value = response.data;

    if (channel.value.streams && channel.value.streams.length > 0) {
      const streamData = channel.value.streams.map((stream) => {
        const records = stream.streams_records;

        if (records && records.length > 0) {
          const firstRecord = records[0];
          const lastRecord = records[records.length - 1];
          const followersGained = lastRecord.viewer_count - firstRecord.viewer_count;
          const averageViewers = getAverageViewers(records);
          const maxViewers = Math.max(...records.map(record => record.viewer_count));

          const startDate = new Date(stream.start_date);
          const endDate = new Date(stream.end_date);
          const hoursStreamed = (endDate - startDate) / (1000 * 60 * 60);

          return {
            streamId: stream.id,
            start: formatDate(stream.start_date),
            end: formatDate(stream.end_date),
            followersGained,
            averageViewers,
            hoursStreamed,
            maxViewers,
          };
        }
        return null;
      }).filter(data => data !== null);

      chartData.value = {
        labels: streamData.map(data => `${data.start}`),
        datasets: [
          {
            type: 'bar',
            label: "Followers Gained",
            data: streamData.map(data => data.followersGained),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            type: 'line',
            label: "Average Viewers",
            data: streamData.map(data => data.averageViewers),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          },
          {
            type: 'line',
            label: "Max Viewers",
            data: streamData.map(data => data.maxViewers),
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderWidth: 2,
          },
        ],
      };

      chartOptions.value = {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: { title: { display: true, text: "Streams" } },
          y: { title: { display: true, text: "Count" } },
        },
      };
    }

    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching channel details:", error);
    isLoading.value = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const getAverageViewers = (records) => {
  const totalViewers = records.reduce((sum, record) => sum + record.viewer_count, 0);
  return Math.round(totalViewers / records.length);
};

onMounted(() => {
  fetchChannelDetails();
});

</script>
