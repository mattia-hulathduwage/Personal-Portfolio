import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCq-t1CXPGkWCPgL2sKvq-joifDM8WGdBY",
  authDomain: "portfolioweb-59941.firebaseapp.com",
  databaseURL: "https://portfolioweb-59941-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolioweb-59941",
  storageBucket: "portfolioweb-59941.firebasestorage.app",
  messagingSenderId: "343757662933",
  appId: "1:343757662933:web:ee45af5977ffbeb411505c",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
const db = getDatabase(app);

export { db };
