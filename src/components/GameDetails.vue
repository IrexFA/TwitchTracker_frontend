<template>
    <div class="flex flex-col items-center">
        <div class="bg-gray-800 p-8 flex gap-8 w-full">
            <img :src="data.image_url.replace('{width}', '210').replace('{height}', '280')" alt="game image"
                class="mx-right w-48 h-64 rounded" :class="{ 'animate-pulse': !data.id }" />
            <div class="w-full">
                <h1 class="text-3xl font-bold mb-4 container text-white flex items-center gap-2">
                    <span>Game:</span>
                    <span v-if="data.name" class="">{{ data.name }}</span>
                    <div v-else class="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                </h1>
                <div class="flex w-full justify-left gap-10">
                    <DataCard name="Live viewers" :data="data.live_viewers" />
                    <DataCard name="Live channels" :data="data.live_channels" />
                </div>
            </div>
        </div>

        <div class="w-3/4 h-max flex justify-center">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import DataCard from './DataCard.vue';

import {
    BarElement,
    CategoryScale, Chart as ChartJS, Legend, LinearScale,
    LineElement,
    PointElement,
    Title, Tooltip
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale)
const route = useRoute();
const id = route.params.id
const defaultData = {
    id: null,
    name: null,
    image_url: " https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg", live_viewers: 214105, live_channels: 2906,
    records: [
        { id: 18, game_id: 18, total_streams: 3173, total_viewers: 216304, timestamp: new Date("2024-10-20T12:20:17.000Z") },
        { id: 38, game_id: 18, total_streams: 3220, total_viewers: 218872, timestamp: new Date("2024-10-20T12:30:11.000Z") },
        { id: 58, game_id: 18, total_streams: 3279, total_viewers: 226830, timestamp: new Date("2024-10-20T12:40:11.000Z") },
        { id: 78, game_id: 18, total_streams: 3274, total_viewers: 232410, timestamp: new Date("2024-10-20T12:50:11.000Z") },
        { id: 98, game_id: 18, total_streams: 3284, total_viewers: 247530, timestamp: new Date("2024-10-20T13:00:11.000Z") },
        { id: 118, game_id: 18, total_streams: 3455, total_viewers: 252792, timestamp: new Date("2024-10-20T13:10:11.000Z") }
    ]
};
const data = ref(defaultData);
const toChartData = (data) => {
    const labelToData = data.records.reduce((acc, record) => {
        const dateString = new Date(record.timestamp).toDateString();
        if (!acc[dateString]) {
            acc[dateString] = { total_viewers: 0, total_streams: 0, count: 0 };
        }
        acc[dateString].total_viewers += record.total_viewers;
        acc[dateString].total_streams += record.total_streams;
        acc[dateString].count += 1;
        return acc;
    }, {});
    const labels = Object.keys(labelToData);
    const datasets = [
        {
            label: 'Average viewers',
            data: labels.map(label => labelToData[label].total_viewers / labelToData[label].count),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            yAxisID: 'y1'
        },
        {
            label: 'Average streams',
            data: labels.map(label => labelToData[label].total_streams / labelToData[label].count),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            yAxisID: 'y2'
        }
    ];
    return { labels, datasets };
};
const chartData = ref(toChartData(defaultData));
const chartOptions = ref({
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
    },
    scales: {
        x: {
            title: { display: true, text: "Date" },
        },
        y1: {
            title: { display: true, text: "Viewers" },
            position: 'left'
        },
        y2: {
            title: { display: true, text: "Streams" },
            position: 'right',
            // grid line settings
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    }
});
api.get(`/games/${id}`).then(response => {
    data.value = response.data;
    chartData.value = toChartData(data.value);
});
</script>