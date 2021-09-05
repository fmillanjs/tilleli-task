import * as firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyACOzqx-33K3hsv_GKb38cUAOwS78yFF4s",
    authDomain: "tilleli-task-4c941.firebaseapp.com",
    projectId: "tilleli-task-4c941",
    storageBucket: "tilleli-task-4c941.appspot.com",
    messagingSenderId: "161054348390",
    appId: "1:161054348390:web:ff7bbb51c3f8497db4c9a7"
  };

let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
 

export { db, auth }