import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWakCr5p6PWHZ9Jr-kxePh7g3tcrPirqc",
  authDomain: "ecom-2fa57.firebaseapp.com",
  projectId: "ecom-2fa57",
  storageBucket: "ecom-2fa57.appspot.com",
  messagingSenderId: "171209773020",
  appId: "1:171209773020:web:f05b03fbb854d96208c919",
  measurementId: "G-BXZRGQW8BR"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app;