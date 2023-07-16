import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4wJdmzo-dp_tyl-J33C8XV4N1zuVsd7Y",
    authDomain: "inotebook-af511.firebaseapp.com",
    projectId: "inotebook-af511",
    storageBucket: "inotebook-af511.appspot.com",
    messagingSenderId: "675411143812",
    appId: "1:675411143812:web:2d93b8ce33ecea78ee26d1",
    measurementId: "G-GG21JB6SS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

export { GoogleProvider, auth, signOut, FacebookProvider }