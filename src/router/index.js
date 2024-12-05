import { createRouter, createWebHistory } from 'vue-router'

import Home from '/src/components/Home.vue'
import Channels from '/src/components/Channels.vue'
import ChannelDetails from '/src/components/ChannelDetails.vue'
import Games from '/src/components/Games.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'channels',
        path: '/channels',
        component: Channels,
    },
    {
        name: 'channel',
        path: '/channels/:id',
        component: ChannelDetails,
    },
    {
        name: 'games',
        path: '/games',
        component: Games,
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router