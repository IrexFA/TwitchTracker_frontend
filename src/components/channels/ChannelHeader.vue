<template>
  <div class="flex items-center mb-6">
    <img :src="channel.image_url" alt="Profile Picture" class="w-20 h-20 rounded-full mr-4" />
    <div>
      <h1 class="text-3xl font-bold mb-2">Channel: {{ channel.name }}</h1>
      <p class="text-lg font-semibold">Followers: {{ channel.followers_count }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  channel: {
    type: Object,
    required: true,
  },
});
</script>
