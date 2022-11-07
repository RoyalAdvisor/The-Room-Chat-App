import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, getDoc, doc } from "firebase/firestore"; 

const getCurrentUser = (id) => {

    const error = ref(null)
    const userInfo = ref(null)

    const loadData = async () => {
        try {
            const userRef = doc(db, 'users', id)
            const userSnap = await getDoc(userRef)
            userInfo.value = { ...userSnap.data(), id: userSnap.id }
        } catch (err) {
            error.value = err.message
        }
    }

    return { userInfo, error, loadData }
}

export default getCurrentUser