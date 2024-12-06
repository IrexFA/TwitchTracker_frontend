import { createRouter, createWebHistory } from 'vue-router'

import GameDetails from '../components/GameDetails.vue'
import ChannelDetails from '/src/components/channels/ChannelDetails.vue'
import Channels from '/src/components/channels/Channels.vue'
import Games from '/src/components/Games.vue'
import Home from '/src/components/home/Home.vue'

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
    {
        name: 'game',
        path: '/games/:id',
        component: GameDetails
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router