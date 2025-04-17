// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCyw6LxuauzyPHHtLs7mjeyrauY6FmkLRk",
    authDomain: "equipment-tracking-4cc1a.firebaseapp.com",
    projectId: "equipment-tracking-4cc1a",
    storageBucket: "equipment-tracking-4cc1a.firebasestorage.app",
    messagingSenderId: "648095088927",
    appId: "1:648095088927:web:46d065731b0d6bfd27702a",
    measurementId: "G-JX9LZNG2KJ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();