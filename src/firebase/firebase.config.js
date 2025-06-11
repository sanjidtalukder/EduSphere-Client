// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // <-- auth এর জন্য import
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsnTij9tW8OUx-7hB9imvtbP3BBv_2KAQ",
  authDomain: "my-edusphere-client.firebaseapp.com",
  projectId: "my-edusphere-client",
  storageBucket: "my-edusphere-client.firebasestorage.app",
  messagingSenderId: "249335727884",
  appId: "1:249335727884:web:c1128dbf39d9d98b1eab29",
  measurementId: "G-24HZTZT9G3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // <-- auth instance তৈরি করলাম
const analytics = getAnalytics(app);

export { app, auth, analytics };  // <-- auth export করতে হবে
