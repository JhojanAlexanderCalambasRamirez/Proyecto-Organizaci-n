// src/utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDKTveJUKHlY4ioPcYIoEsAWaOtmQ5msBw",
  authDomain: "jobsearch-284fa.firebaseapp.com",
  projectId: "jobsearch-284fa",
  storageBucket: "jobsearch-284fa.appspot.com",
  messagingSenderId: "835836872345",
  appId: "1:835836872345:web:ed8cfb1d43bbcc73715a08",
  measurementId: "G-47J1N1DVLC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;
