<template>
    <div class="p-4 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-semibold mb-4">Hours Watched</h2>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart } from "chart.js/auto";

const props = defineProps({
    hoursWatchedData: {
        type: Array,
        required: true,
    },
});

const chartInstance = ref(null);
const chartCanvas = ref(null);

onMounted(() => {
    if (chartCanvas.value) {
        chartInstance.value = new Chart(chartCanvas.value, {
            type: "line",
            data: {
                labels: props.hoursWatchedData.map((data) => data.date),
                datasets: [
                    {
                        label: "Hours Watched",
                        data: props.hoursWatchedData.map((data) => data.hours),
                        borderColor: "rgba(153, 102, 255, 1)",
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                },
                scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Hours Watched" } },
                },
            },
        });
    }
});

watch(
    () => props.hoursWatchedData,
    (newData) => {
        if (chartInstance.value) {
            chartInstance.value.data.labels = newData.map((data) => data.date);
            chartInstance.value.data.datasets[0].data = newData.map((data) => data.hours);
            chartInstance.value.update();
        }
    }
);
</script>

<style scoped>
canvas {
    max-height: 400px;
}
</style>