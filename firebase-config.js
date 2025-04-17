// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "*******************************",
    authDomain: "****************************",
    projectId: "*************",
    storageBucket: "*************",
    messagingSenderId: "*******************",
    appId: "***********************************",
    measurementId: "***********************"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
