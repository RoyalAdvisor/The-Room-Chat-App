import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzM9cGle_4mJiK8TwHLyaqNSrxY3pbEzo",
  authDomain: "dojo-blog-52.firebaseapp.com",
  projectId: "dojo-blog-52",
  storageBucket: "dojo-blog-52.appspot.com",
  messagingSenderId: "664520752802",
  appId: "1:664520752802:web:082281486a471a1798e1fb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth }