import axios from 'axios';
export default axios.create({
    baseURL: 'https://twitchtracker-production.up.railway.app',
    headers: {
        'Content-type': 'application/json',
    },
});