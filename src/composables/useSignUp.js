import { ref } from 'vue'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore"; 

const error = ref(null)

const signUp = async (email, password, displayName, photo) => {
    error.value = null
    try {

        const response = await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                const user = {
                    displayName: displayName,
                    email: userCredential.user.email,
                    photoURL: photo
                }
                
                await updateProfile(auth.currentUser, { displayName: displayName, photoURL: photo})
                const docRef = doc(collection(db, 'users'), userCredential.user.uid)
                await setDoc(docRef, user )
            })
        error.value = null
        return response

    } catch (err) {
        error.value = err.message;
    }
}

const useSignUp = () => {
    return { error, signUp }
}

export default useSignUp