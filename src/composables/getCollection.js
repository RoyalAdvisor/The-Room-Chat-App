import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config'
import { query, orderBy, onSnapshot, collection } from "firebase/firestore"; 

const getCollection = (table) => {
    const documents = ref(null)
    const error = ref(null)

    const docsRef = collection(db, table)
    const collectionQuery = query(docsRef, orderBy('createdAt', 'desc'))

    const collections = onSnapshot(collectionQuery, (QuerySnapshot) => {
        let results = []
        QuerySnapshot.forEach((item) => {
            item.data().createdAt && results.push({ ...item.data(), id: item.id })
        })
        documents.value = results
        error.value = null
    }, (err) => { 
        documents.value = null
        error.value = err.message
    })

    watchEffect((onInvalidate) => {
        //onInvalidate allows us to do a clean up when the component is unmounted!!!
        onInvalidate(() => {
            collections()
        })
    })
    
    return { documents, error }
}

export default getCollection