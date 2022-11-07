import { ref } from 'vue'
import { getStorage, uploadBytesResumable, ref as storageRef, getDownloadURL } from "firebase/storage";

const uploadTask = ref(null)
const photoURL = ref(null)
const imageLoading = ref(false)
const progress = ref(0)

const useStorage = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' '
    const generateString = (length) => {
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    generateString(10)

    const storage = getStorage()
    const storageReference = storageRef(storage, `images/${result}.jpg`)

    const upload = (e) => {
        uploadTask.value = uploadBytesResumable(storageReference, e.target.files[0])
        uploadTask.value.on('state_changed', (snapshot) => {
            imageLoading.value = true
            progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress.value + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.value.snapshot.ref).then((downloadURL) => {
                photoURL.value = downloadURL
                imageLoading.value = false
            });
        })
    }
    return { upload, photoURL, imageLoading, progress }

}

export default useStorage