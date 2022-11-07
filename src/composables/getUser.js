import { ref, watchEffect } from 'vue'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser)

onAuthStateChanged(auth, (userInfo) => {
    user.value = userInfo
})

const getUser = () => {
    return { user }
}

watchEffect((onInvalidate) => {
    onInvalidate(() => {
        getUser()
    })
})

export default getUser