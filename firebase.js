import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-KAzCqPVgi-ysmBreuMC6cfP8unvbXfs",
    authDomain: "chat-528f1.firebaseapp.com",
    projectId: "chat-528f1",
    storageBucket: "chat-528f1.appspot.com",
    messagingSenderId: "144503264128",
    appId: "1:144503264128:web:54be3cb454c59c5a622765"
  };

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};