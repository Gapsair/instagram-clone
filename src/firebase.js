// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcZXUAecmJCyv-DeqUWMy_RG17D_2fjAg",
  authDomain: "intagram-clone-react-77acb.firebaseapp.com",
  databaseURL: "https://intagram-clone-react-77acb-default-rtdb.firebaseio.com",
  projectId: "intagram-clone-react-77acb",
  storageBucket: "intagram-clone-react-77acb.appspot.com",
  messagingSenderId: "3676964936",
  appId: "1:3676964936:web:7e94ca707e48de0859307d",
  measurementId: "G-RR026Q3FQM"
});

const  db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
//export default db;