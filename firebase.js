import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD1LzS4UePe1mhb3FDBzX9P7NYlI0WdYFg',
  authDomain: 'facebook-clone-815c5.firebaseapp.com',
  projectId: 'facebook-clone-815c5',
  storageBucket: 'facebook-clone-815c5.appspot.com',
  messagingSenderId: '1018762382278',
  appId: '1:1018762382278:web:192be6ffc713b422e980c7',
};

// Check initialize or not if none->initializeApp & if its not firebase use the existing app
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
// const auth = app.auth();  //not used auth yet
const storage = firebase.storage();

export { db, storage };

// export { auth, db, storage }; // If auth used
