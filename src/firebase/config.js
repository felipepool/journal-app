// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyuZJzNj9MCjbaFs6GubnvHkICEjvENf4",
  authDomain: "react-cursos-59d11.firebaseapp.com",
  projectId: "react-cursos-59d11",
  storageBucket: "react-cursos-59d11.appspot.com",
  messagingSenderId: "460650010849",
  appId: "1:460650010849:web:1ae701fefde9dc8fbe7fa0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)