import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, setDoc, collection } from "firebase/firestore"; 

const useCollection = (table) => {
    const error = ref(null)

    const addDoc = async (document) => {
        error.value = null

        try {
            const docRef = doc(collection(db, table))
            await setDoc(docRef, document)
        } catch (err) {
            
        }
    }

    return { error, addDoc }
}

export default useCollection