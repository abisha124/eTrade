import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoeXtSRqAvxlFcCEDw2wlm1zgNnPyQP4c",
  authDomain: "etrade-408b6.firebaseapp.com",
  projectId: "etrade-408b6",
  storageBucket: "etrade-408b6.firebasestorage.app",
  messagingSenderId: "544988694987",
  appId: "1:544988694987:web:d8397e3b055e5309224e4e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };