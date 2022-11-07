<script setup>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import LogoutIcon from './LogoutIcon.vue'
import UserIcon from './UserIcon.vue'
import { useRouter } from 'vue-router'

const { error, logout } = useLogout()
const { user } = getUser()
const router = useRouter()

const navigateToProfile = () => {
    router.push({ name: 'Profile' })
}

const handleLogout = async () => {
    await logout()
}

</script>

<template>
    <nav v-if="user" class="flex justify-between sm:pt-6 sm:px-6 pt-4 px-4 sm:pb-0 pb-4 sm:z-0 z-10 bg-slate-50 w-full rounded-md gap-6 items-center sm:static fixed top-0">
        <div class="flex justify-center items-center gap-4">
            <div
            v-if='user.photoURL'
            class="w-9 h-9 rounded-md shadow-sm focus:scale-95 transition-all flex justify-center items-center"
            @click.prevent="navigateToProfile"
            >
                <img :src='user.photoURL' class='w-full h-full object-cover rounded-md'/>
            </div>
            <button
            v-else
            class="w-7 h-7 bg-slate-200 rounded-md shadow-sm focus:scale-95 transition-all flex justify-center items-center text-gray-400"
            @click.prevent="navigateToProfile"
            >
                <UserIcon/>
            </button>
            <div class="flex justify-center items-start flex-col">
                <p class="text-blue-500 font-semibold text-sm">Hi, {{ user.displayName }}! </p>
                <p class="text-gray-400 font-light text-xs">{{ user.email }}</p>
            </div>
        </div>
        <button
        @click="handleLogout"   
         class="w-36 h-9 bg-blue-500 text-white rounded-md shadow-white sm:text-sm text-xs focus:scale-95 transition-all flex justify-center items-center gap-1">
            <LogoutIcon/> Logout
         </button>
    </nav>
</template>