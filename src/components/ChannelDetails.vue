<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Streamer: {{ name }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = computed(() => route.params.name);
</script>
