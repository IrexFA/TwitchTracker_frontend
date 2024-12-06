<template>
    <div class="p-4 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-semibold mb-4">Followers</h2>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart } from "chart.js/auto";

const props = defineProps({
    followersData: {
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
                labels: props.followersData.map((data) => data.date),
                datasets: [
                    {
                        label: "Followers",
                        data: props.followersData.map((data) => data.followers),
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
                    y: { title: { display: true, text: "Followers" } },
                },
            },
        });
    }
});

watch(
    () => props.followersData,
    (newData) => {
        if (chartInstance.value) {
            chartInstance.value.data.labels = newData.map((data) => data.date);
            chartInstance.value.data.datasets[0].data = newData.map((data) => data.followers);
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