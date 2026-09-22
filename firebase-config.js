/* ══════════════════════════════════════════════════════
   FIREBASE CONFIG — Lil' Cocolates (modular SDK v12)
   This is a <script type="module"> file — see index.html

   NOTE: We only use Firestore (free on Spark plan, no card
   needed). Cloud Storage was dropped since it now requires
   the paid Blaze plan — screenshots are instead compressed
   and stored as base64 text inside the Firestore order doc.
══════════════════════════════════════════════════════ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getFirestore,
  doc,
  runTransaction,
  setDoc,
  serverTimestamp,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaBAmk0ASHfVPr7uPQpxXNok228JAGBRE",
  authDomain: "lil-cocolates-d5b5f.firebaseapp.com",
  databaseURL: "https://lil-cocolates-d5b5f-default-rtdb.firebaseio.com",
  projectId: "lil-cocolates-d5b5f",
  storageBucket: "lil-cocolates-d5b5f.firebasestorage.app",
  messagingSenderId: "267236978702",
  appId: "1:267236978702:web:ce8dfd8d8bb64bfd470c5f",
  measurementId: "G-BZ126VNTHN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* script.js is a plain (non-module) script, so it can't use `import`.
   We expose everything it needs on `window` here instead. */
window.firebaseDb = db;
window.firebaseUtils = {
  doc,
  runTransaction,
  setDoc,
  serverTimestamp,
  collection,
  onSnapshot
};
