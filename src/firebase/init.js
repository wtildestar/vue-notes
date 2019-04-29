import firebase from "firebase/app";
import firestore from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCwRhK8e6QiWSMVk3aiXrZBVIh0pkhCZJY",
  authDomain: "vue-notes-90b4b.firebaseapp.com",
  databaseURL: "https://vue-notes-90b4b.firebaseio.com",
  projectId: "vue-notes-90b4b",
  storageBucket: "vue-notes-90b4b.appspot.com",
  messagingSenderId: "166462548892"
};
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp.firestore();
