<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Streams performance</h2>
        <Line id="my-chart-id" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

defineProps({
    chartData: {
        type: Object,
        required: true,
    },
    chartOptions: {
        type: Object,
        required: true,
    },
});
</script>