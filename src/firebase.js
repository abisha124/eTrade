import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2jydKIGa2dXIVFPk-urfhp2-IpPFvoHQ",
  authDomain: "react-task-a9bf2.firebaseapp.com",
  projectId: "react-task-a9bf2",
  storageBucket: "react-task-a9bf2.firebasestorage.app",
  messagingSenderId: "49336012197",
  appId: "1:49336012197:web:fded5f724cc7dc1248ac4c",
  measurementId: "G-790PSSSEBM"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };