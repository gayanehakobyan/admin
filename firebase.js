import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyAJ1NYvDWBqEivir0VsIJ-2k3TJmoBWMLE",
    authDomain: "admin-panel-644d4.firebaseapp.com",
    databaseURL: "https://admin-panel-644d4-default-rtdb.firebaseio.com",
    projectId: "admin-panel-644d4",
    storageBucket: "admin-panel-644d4.appspot.com",
    messagingSenderId: "863454238985",
    appId: "1:863454238985:web:f8b5f5ad7bd46a668cdbd8",
    measurementId: "G-RGMP5WYD5P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  const auth = firebase.auth()
  const db = firebase.firestore()

  export default firebase
  export {auth, db }
   
