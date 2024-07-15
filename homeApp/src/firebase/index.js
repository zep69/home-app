// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBTHg6-Ew1Ka0WxGYEzf-hj5yuuhUXJx0g",
	authDomain: "home-app-b771a.firebaseapp.com",
	projectId: "home-app-b771a",
	storageBucket: "home-app-b771a.appspot.com",
	messagingSenderId: "706632218149",
	appId: "1:706632218149:web:c70d20bcb5b696a43071cc",
	measurementId: "G-9428LCZVRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export{analytics, auth, db}