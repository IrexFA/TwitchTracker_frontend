<template>
    <nav class="bg-purple-600 p-4 text-white">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">
                <router-link to="/" class="cursor-pointer" active-class="font-bold">Streamer
                    Tracker</router-link>
            </h1>
            <ul class="flex space-x-6">
                <li>
                    <router-link to="/channels" class="hover:underline" active-class="font-bold">Channels</router-link>
                </li>
                <li>
                    <router-link to="/games" class="hover:underline" active-class="font-bold">Games</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style scoped></style>
