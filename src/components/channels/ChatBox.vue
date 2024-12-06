<template>
    <div class="fixed bottom-4 right-4 z-50">
        <button @click="toggleChat"
            class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700">
            {{ isOpen ? "X" : "💬" }}
        </button>

        <div v-if="isOpen" class="w-72 h-96 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
            <div class="mb-2">
                <label class="block text-gray-700 text-sm mb-1">Username:</label>
                <input v-model="username" placeholder="Enter your username"
                    class="w-full border border-gray-300 rounded px-2 py-1" />
            </div>

            <div class="overflow-y-auto flex-1 mb-2">
                <div v-for="(message, index) in messages" :key="index" class="mb-2 p-2 rounded-lg" :class="{
                    'bg-yellow-100 self-end text-black-800': message.author === username,
                    'bg-gray-200 self-start text-gray-800': message.author !== username,
                }">
                    <p class="text-gray-400 text-xs">{{ message.timestamp }}</p>
                    <strong>{{ message.author }}</strong>: {{ message.text }}
                </div>
            </div>

            <div class="flex items-center">
                <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..."
                    class="flex-1 border border-gray-300 rounded px-2 py-1" />
                <button @click="sendMessage"
                    class="bg-purple-600 text-white px-4 py-1 ml-2 rounded shadow-md hover:bg-purple-700">
                    ➣
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

const isOpen = ref(false);
const messages = ref([]);
const newMessage = ref("");
const username = ref("Anonymous");
const socket = ref(null);

const props = defineProps({
    channelId: {
        type: String,
        required: true,
    },
});

const toggleChat = () => {
    isOpen.value = !isOpen.value;
};

onMounted(() => {
    socket.value = io("http://127.0.0.1:4567");

    socket.value.emit("joinRoom", { channelId: props.channelId });

    socket.value.on("messageHistory", (history) => {
        messages.value = history;
    });

    socket.value.on("message", (message) => {
        messages.value.push(message);
    });
});

onUnmounted(() => {
    if (socket.value) {
        socket.value.disconnect();
    }
});

// Envoyer un message
const sendMessage = () => {
    if (newMessage.value.trim()) {
        messages.value.push({ author: username.value, text: newMessage.value, type: "user" });

        socket.value.emit("chatMessage", {
            text: newMessage.value,
            channelId: props.channelId,
            author: username.value,
        });

        newMessage.value = "";
    }
};
</script>


<style scoped></style>
