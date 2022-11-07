<script setup>
import getCurrentUser from '../composables/getCurrentUser'
import getUser from '../composables/getUser'
import BackIcon from './BackIcon.vue'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'

const router = useRouter()
const { user } = getUser()
const { error, userInfo, loadData } = getCurrentUser(user.value.uid)

watchEffect(() => {
  loadData()  
})

const navigateToChatRoom = () => {
    router.push({ name: 'Chatroom' })
}

</script>

<template>
    <div class="flex flex-col justify-start items-center sm:w-[28rem] w-full bg-slate-50 shadow-sm sm:rounded-md rounded-none sm:h-auto h-screen relative sm:p-6 p-4 gap-6" v-if="userInfo">
        <div
        v-if="userInfo.photoURL"
         class="w-full rounded-md shadow-sm">
            <img :src="userInfo.photoURL" class="w-full object-contain rounded-md"/>
        </div>
        <div v-else class='w-full h-[45vh] bg-slate-200 rounded-md shadow-sm'></div>
        <div class="w-full flex flex-col justify-center items-start gap-6">
            <div class="w-full">
                <h2 class="text-blue-500 sm:text-xl text-lg font-semibold">Display Name</h2>
                <p class="text-gray-400 sm:text-sm text-xs">{{ userInfo.displayName }}</p>
            </div>
            <div class="w-full">
                <h2 class="text-blue-500 sm:text-xl text-lg font-semibold">Email</h2>
                <p class="text-gray-400 sm:text-sm text-xs">{{ userInfo.email }}</p>
            </div>
        </div>
        <div class="w-full flex justify-end items-center">
            <button
            @click.prevent="navigateToChatRoom"
            class="w-36 h-9 bg-blue-500 text-white rounded-md shadow-sm sm:text-sm text-xs flex justify-center items-center gap-1 focus:scale-95 transition-all">
                <BackIcon/> Back
            </button>
        </div>
    </div>
</template>