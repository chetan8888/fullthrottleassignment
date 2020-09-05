// this file contains the configuration of the firebase database used for this app.

import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCI5PxPZnJ9YiVPVFE5NtFYAStoazXezdE",
    authDomain: "full-throttle-7a03a.firebaseapp.com",
    databaseURL: "https://full-throttle-7a03a.firebaseio.com",
    projectId: "full-throttle-7a03a",
    storageBucket: "full-throttle-7a03a.appspot.com",
    messagingSenderId: "995048253019",
    appId: "1:995048253019:web:ec65d65b184056d28c817e"
})

const db = firebaseApp.firestore()

export {db}