<script setup>
import { ref, watchEffect } from 'vue'
import useLogin from '../composables/useLogin'
import LoadingSpinner from './LoadingSpinner.vue'

const { error, login } = useLogin()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const emit = defineEmits(['login'])

const handleSubmit = async () => {
    loading.value = true
    await login(email.value, password.value)
    if (!error.value) {
        loading.value = false
        emit('login')
    } else {
        loading.value = false
    }
}


watchEffect(() => {
    switch (error.value) {
        case 'Firebase: Error (auth/wrong-password).':
            errorMessage.value = 'Password is incorrect.'
            break;
        case 'Firebase: Error (auth/user-not-found).':
            errorMessage.value = 'User not found.'
            break;
    }
})


</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col justify-center items-center bg-slate-50 shadow-md rounded-md sm:w-[28rem] w-[20rem] gap-6 py-12 sm:px-6 px-4">
        <h2 class="text-2xl w-full font-semibold text-cyan-500">Log In.</h2>
        <input 
        type="email" required placeholder="Email" v-model="email" 
        class="w-full h-9 shadow-white rounded-sm px-2 bg-slate-100 sm:placeholder:text-sm placeholder:text-xs sm:text-sm text-xs">
        <input 
        type="password" required placeholder="Password" v-model="password" 
        class="w-full h-9 shadow-white rounded-sm px-2 bg-slate-100 sm:placeholder:text-sm placeholder:text-xs sm:text-sm text-xs">
        <button 
        class="w-36 h-9 bg-cyan-500 text-white rounded-sm shadow-white sm:text-sm text-xs flex justify-center items-center focus:scale-95 transition-all">
            <span v-if="loading === true">
                <LoadingSpinner/>
            </span>
            <span v-else>Log In</span>
        </button>
    </form>
    <div v-if="error">
        <p class="text-xs text-red-700 max-w-4xl text-left p-2">
        {{ errorMessage }}
        </p>
    </div>
</template>
