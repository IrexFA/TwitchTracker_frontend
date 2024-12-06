<template>
  <div class="p-8">
    <ChannelHeader :channel="channel" />
    <div v-if="isLoading">
      <p>Loading channel details...</p>
    </div>
    <div v-else>
      <ChartSection :chartData="chartData" :chartOptions="chartOptions" />
      <RecentStreams :streams="recentStreams" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from '../../api';

// Import des sous-composants
import ChannelHeader from "./ChannelHeader.vue";
import ChartSection from "./ChartSection.vue";
import RecentStreams from "./RecentStreams.vue";

const route = useRoute();
const id = computed(() => route.params.id);
const channel = ref({});
const recentStreams = ref([]);
const chartData = ref({});
const chartOptions = ref({});
const isLoading = ref(true);

const fetchChannelDetails = async () => {
  const channelId = route.params.id;
  try {
    const response = await api.get(
      `/channels/${channelId}`
    );
    channel.value = response.data;



    if (channel.value.streams && channel.value.streams.length > 0) {
      recentStreams.value = channel.value.streams.map((stream) => {
        const startDate = new Date(stream.start_date);

        const endDate = stream.end_date ? new Date(stream.end_date) : new Date();

        const streamRecords = channel.value.records.filter((record) => {
          const recordDate = new Date(record.timestamp);
          return recordDate >= startDate && recordDate <= endDate;
        });

        let followersGained = 0;
        if (streamRecords.length > 1) {
          const firstRecord = streamRecords[0];
          const lastRecord = streamRecords[streamRecords.length - 1];
          followersGained = Math.max(0, lastRecord.followers_count - firstRecord.followers_count);
        }


        const maxViewers = Math.max(
          ...(stream.streams_records || []).map((record) => record.viewer_count)
        );
        const totalViewers = (stream.streams_records || []).reduce(
          (sum, record) => sum + record.viewer_count,
          0
        );
        const averageViewers = totalViewers / (stream.streams_records?.length || 1);
        const hoursStreamed = ((endDate - startDate) / (1000 * 60 * 60)).toFixed(
          1
        );

        console.log(stream.end_date);

        return {
          streamId: stream.id,
          start: formatDate(stream.start_date),
          end: stream.end_date,
          followersGained,
          hoursStreamed,
          maxViewers,
          averageViewers: Math.round(averageViewers),
        };
      });

      chartData.value = {
        labels: recentStreams.value.map((data) => `${data.start}`),
        datasets: [
          {
            type: "bar",
            label: "Followers Gained",
            data: recentStreams.value.map((data) => data.followersGained),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Max Viewers",
            data: recentStreams.value.map((data) => data.maxViewers),
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderWidth: 2,
          },
          {
            type: "line",
            label: "Average Viewers",
            data: recentStreams.value.map((data) => data.averageViewers),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
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

const formatDate = (date) => new Date(date).toDateString();

onMounted(() => {
  fetchChannelDetails();
});
</script>
