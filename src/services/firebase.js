import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA15xf-hsjSbgCBV4yy_3HWJtPO-2qrbjo",
    authDomain: "classchatter-83971.firebaseapp.com",
    databaseURL: "https://classchatter-83971.firebaseio.com",
    projectId: "classchatter-83971",
    storageBucket: "classchatter-83971.appspot.com",
    messagingSenderId: "309585191019",
    appId: "1:309585191019:web:dfb3b7db5d5225220d912e",
    measurementId: "G-ZS841NGZJS"
  };
  // Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const auth = firebase.auth;
export const db = firebase.firestore();

export default firebase