<template>
  <div class="p-8">
    <h1 class="text-center text-3xl text-gray-800 mb-4 font-body">MOST WATCHED GAMES ON TWITCH</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class=""></th>
          <th class=""></th>
          <th class="px-4 py-2">AVG <br> VIEWERS</th>
          <th class="px-4 py-2">7-DAY <br> CHANGE</th>
          <th class="px-4 py-2">TWITCH <br> SHARE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="game.name"
          :class="'border-t cursor-pointer transition duration-0 hover:duration-150 hover:bg-gray-100'">
          <td class="px-4 py-2 text-center">#{{ index + 1 }}</td>
          <td class="px-4 py-2 flex items-center">
            <img :src="game.image" alt="game image" class="w-10 h-full mr-2" />
            <span>{{ game.name }}</span>
          </td>
          <td class="px-4 py-2 text-center font-bold text-gray-900">{{ game.avgViewers }}</td>
          <td class="px-4 py-2 text-center" :class="game.change > 0 ? 'text-green-600' : 'text-red-600'">
            {{ game.change > 0 ? '▲' : '▼' }} {{ Math.abs(game.change) }}%
          </td>
          <td class="px-4 py-2 text-center">{{ game.share }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      games: [
        {
          name: "Just Chatting",
          image: "https://via.placeholder.com/40", // Placeholder image URL
          avgViewers: "337K",
          change: -12.3,
          share: 14.744,
        },
        {
          name: "League of Legends",
          image: "https://via.placeholder.com/40",
          avgViewers: "133K",
          change: 9,
          share: 5.816,
        },
        {
          name: "Grand Theft Auto V",
          image: "https://via.placeholder.com/40",
          avgViewers: "117K",
          change: -12.3,
          share: 5.128,
        },
        {
          name: "World of Warcraft",
          image: "https://via.placeholder.com/40",
          avgViewers: "115K",
          change: 53.6,
          share: 5.029,
        },
        {
          name: "EA Sports FC 25",
          image: "https://via.placeholder.com/40",
          avgViewers: "112K",
          change: 497,
          share: 4.882,
        },
        {
          name: "Counter-Strike",
          image: "https://via.placeholder.com/40",
          avgViewers: "84K",
          change: 15.8,
          share: 3.675,
        },
        {
          name: "VALORANT",
          image: "https://via.placeholder.com/40",
          avgViewers: "77K",
          change: -2.3,
          share: 3.365,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Ajoute des styles ici si nécessaire */
</style>
