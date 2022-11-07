<script setup>
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import NewChatForm from '../components/NewChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
import getUser from '../composables/getUser'


const router = useRouter()
const { user } = getUser()

watchEffect(() => {
    if (!user.value) {
        router.push({ name: 'Welcome' })
    }
})  

</script>

<template>  
    <div class="flex flex-col justify-center items-center w-full h-screen overflow-hidden">
        <div class="flex flex-col justify-between items-center sm:w-[28rem] w-full bg-slate-50 shadow-sm sm:rounded-md rounded-none sm:h-[90vh] h-screen relative">
            <Navbar/>
            <ChatWindow/>
            <NewChatForm/>
        </div>
    </div>
</template>