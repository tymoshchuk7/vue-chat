import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDHvO6OO_lU5lMp3vM6D_yie6AzqujjXpc",
    authDomain: "vue-firebase-todo-58774.firebaseapp.com",
    databaseURL: "https://vue-firebase-todo-58774-default-rtdb.firebaseio.com",
    projectId: "vue-firebase-todo-58774",
    storageBucket: "vue-firebase-todo-58774.appspot.com",
    messagingSenderId: "980440508897",
    appId: "1:980440508897:web:a1f47621322ba5ca63caa0"
};

const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()