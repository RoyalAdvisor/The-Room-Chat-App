<script setup>
import { ref } from 'vue'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showLogin = ref(true)

const enterChat = () => {
    router.push({ name: 'Chatroom' })
}

</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-screen gap-8 overflow-hidden relative">
        <transition-group name='fade' appear>
            <div class="flex justify-center items-center w-screen text-white" :key='1'>
                <p class="text-5xl font-semibold sm:text-left text-center">Welcome To The Room.</p>
            </div>
            <div v-if="showLogin" class="flex flex-col justify-center items-center gap-4" :key='2'>
                <LoginForm @login="enterChat"/>
                <p class="text-xs text-white cursor-pointer">No account yet? <span class="underline" @click.prevent="showLogin = false">Click here to Sign Up</span> instead.</p>
            </div>
            <div v-if="!showLogin" class="flex flex-col justify-center items-center gap-4" :key='3'>
                <SignUpForm @signup="enterChat"/>
                <p class="text-xs text-white cursor-pointer">Already have an account? <span class="underline" @click.prevent="showLogin = true">Click here to Log In.</span></p>
            </div>
        </transition-group>
    </div>
</template>

<style>
    .fade-enter-from {
        opacity: 0;
        transform: translateX(4rem);
    }
    .fade-move {
        transition: all 500ms ease;
    }
    .fade-enter-active {
        transition: all 500ms ease;
    }
    .fade-leave-to {
        opacity: 0;
        transform: translateX(4rem);
    }
    .fade-leave-active {
        transition: all 500ms ease;
        position: absolute;
    }
</style>