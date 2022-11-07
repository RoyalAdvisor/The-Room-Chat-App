<script setup>
import { ref, watchEffect } from 'vue'
import useSignUp from '../composables/useSignUp'
import useStorage from '../composables/useStorage'
import LoadingSpinner from './LoadingSpinner.vue'
import UploadIcon from './UploadIcon.vue'
import CompleteIcon from './CompleteIcon.vue'

const displayName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const { error, signUp } = useSignUp()
const { upload, photoURL, imageLoading, progress } = useStorage()

const emit = defineEmits(['signup'])

const handleUpload = async (e) => {
    await upload(e)
}

const handleSubmit = async () => {
    loading.value = true
    await signUp(email.value, password.value, displayName.value, photoURL.value)
    if (!error.value) {
        loading.value = false
        emit('signup')
    } else {
        loading.value = false
    }
}


watchEffect(() => {
    switch (error.value) {
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            errorMessage.value = 'Password must be atleast 6 characters.'
            break;
        case 'Firebase: Error (auth/email-already-in-use).':
            errorMessage.value = 'The email you are trying to use is linked to another account.'
            break;
    }
})


</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col justify-center items-center bg-slate-50 shadow-md rounded-md sm:w-[28rem] w-[20rem] gap-6 py-12 sm:px-6 px-4">
        <h2 class="text-2xl w-full font-semibold text-blue-500">Sign Up.</h2>
        <input 
        type="text" required placeholder="Display Name" v-model="displayName"
        class="w-full h-9 shadow-white rounded-sm px-2 bg-slate-100 sm:placeholder:text-sm placeholder:text-xs sm:text-sm text-xs">
        <input 
        type="email" required placeholder="Email" v-model="email"
        class="w-full h-9 shadow-white rounded-sm px-2 bg-slate-100 sm:placeholder:text-sm placeholder:text-xs sm:text-sm text-xs">
        <input 
        type="password" required placeholder="Password" v-model="password"
        class="w-full h-9 shadow-white rounded-sm px-2 bg-slate-100 sm:placeholder:text-sm placeholder:text-xs sm:text-sm text-xs">
        <div class="flex w-full items-center justify-center gap-6">
            <label class="w-36 h-9 shadow-white rounded-sm px-2 bg-cyan-500 sm:text-sm text-xs flex justify-center items-center cursor-pointer text-slate-50 focus:scale-95 transition-all">
                <div class="flex items-center justify-center">
                    <p v-if="imageLoading === true">
                        <LoadingSpinner/>
                    </p>
                    <p v-else class="flex items-center justify-center">
                        <span v-if="progress <= 99" class="flex items-center justify-center gap-2">
                            <UploadIcon/> Image
                        </span>
                        <span v-else class="flex items-center justify-center">
                            <CompleteIcon/>
                        </span>
                    </p>
                </div>
                <input 
                @change="handleUpload"
                :disabled="progress === 100"
                type="file"
                class="hidden">
            </label>
            <button
            class="w-36 h-9 bg-blue-500 text-white rounded-sm shadow-white sm:text-sm text-xs flex justify-center items-center focus:scale-95 transition-all">
                <span v-if="loading === true">
                    <LoadingSpinner/>
                </span>
                <span v-else>Sign Up</span>
            </button>
        </div>
    </form>
    <div v-if="error">
         <p class="text-xs text-red-700 max-w-4xl text-left p-2">
           {{ errorMessage }}
         </p>
    </div>
</template>