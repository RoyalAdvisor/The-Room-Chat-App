<script setup>
import getCollection from '../composables/getCollection'
import getUser from '../composables/getUser'
import { formatDistanceToNow } from 'date-fns'
import { computed, ref, onUpdated } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const { user } = getUser()
const { error, documents } = getCollection('messages')
const messages = ref(null)
const formattedDocuments = computed(() => {
    if (documents.value) {
        return documents.value.map((item) => {
            let time = formatDistanceToNow(item.createdAt.toDate())
            return {
                ...item,
                createdAt: time
            }
        })
    }
}) 

onUpdated(() => {
    messages.value.scrollTop = messages.value.scrollHeight
})

</script>

<template>
    <div class="w-full sm:p-6 p-4 text-sm sm:h-[75vh] h-full overflow-y-auto relative">
        <div v-if="error" class="absolute bottom-0 w-full text-xs text-red-700 text-left p-2">{{ error }}</div>
        <div v-if="documents" ref="messages" class="flex justify-start items-start flex-col-reverse gap-4 w-full h-full overflow-y-scroll scrollbar-hide sm:py-0 py-20">
            <div v-for="doc in formattedDocuments" :key="doc.id"
            :class="[ user.displayName == doc.name ? 'items-start text-left' : 'items-end text-right']"
            class="flex flex-col justify-center rounded-md  w-full snap-start gap-2">
                <div
                :class="[ user.displayName == doc.name ? 'bg-blue-500' : 'bg-cyan-500']"  
                class='w-full rounded-md sm:p-4 p-2'>
                    <span class="text-xs text-slate-50 ">{{ doc.createdAt }} ago</span>
                    <div class="flex flex-col w-full gap-1">
                        <span class="font-semibold text-white text-sm">{{ doc.name }}</span>
                        <span class="text-xs text-slate-50">{{ doc.message }}</span>
                    </div>
                </div>
                <div
                :class="[ user.displayName == doc.name ? 'justify-start text-left' : 'justify-end text-right']" 
                class='w-full flex items-center bg-transparent'>
                    <img :src='doc.miniPhoto' class='w-6 h-6 object-cover rounded-md'/>
                </div>
            </div>
        </div>
        <div v-else class="sm:text-sm text-xs text-gray-400 flex flex-col justify-center items-center w-full h-full">
            <LoadingSpinner/>
            <h2>Loading messages...</h2>
        </div>
    </div>
</template>