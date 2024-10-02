import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyA3FmS0V3ktQR72EbDlXWg6dEOLPLPy8hY",
  authDomain: "practica2-db.firebaseapp.com",
  databaseURL: "https://practica2-db-default-rtdb.firebaseio.com",
  projectId: "practica2-db",
  storageBucket: "practica2-db.appspot.com",
  messagingSenderId: "190264276910",
  appId: "1:190264276910:web:8da843107d56a25ae07a3f"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);