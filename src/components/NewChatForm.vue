<script setup>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import SendIcon from './SendIcon.vue'
import { serverTimestamp } from 'firebase/firestore'

const { user } = getUser()
const { error, addDoc } = useCollection('messages')
const message = ref('')

const handleSubmit = async () => {
    const chat = {
        name: user.value.displayName,
        message: message.value,
        miniPhoto: user.value.photoURL,
        createdAt: serverTimestamp()
    }
    await addDoc(chat)
    if (!error.value) {
        message.value = ''
    }
}

</script>

<template>
    <form
    @submit.prevent='handleSubmit'
    class="flex justify-center items-center bg-slate-50 w-full gap-4 sm:px-6 sm:pb-6 pb-4 px-4 sm:pt-0 pt-4 sm:z-0 z-10 rounded-md sm:static fixed bottom-0">
        <textarea
        required
        class="w-full h-9 shadow-white rounded-md p-2 bg-slate-200 shadow-lg sm:placeholder:text-xs placeholder:text-xs sm:text-sm text-xs resize-none flex justify-center items-start overflow-hidden"
         placeholder="Message" v-model="message"></textarea>
        <button class="w-10 h-9 bg-cyan-500 text-slate-50 rounded-md shadow-sm flex justify-center items-center focus:scale-95 transition-all">
            <SendIcon/>
        </button>
    </form>
     <div v-if="error">
        <p class="text-xs text-red-700 max-w-4xl text-left p-2">
        {{ error }}
        </p>
    </div>
</template>