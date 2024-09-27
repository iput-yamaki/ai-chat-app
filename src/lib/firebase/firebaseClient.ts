import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 修正: 正しいパスからインポート
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzheCxv8_v3M3ov3PTiGawtwoOi5VjJpY",
  authDomain: "test-3ec51.firebaseapp.com",
  projectId: "test-3ec51",
  storageBucket: "test-3ec51.appspot.com",
  messagingSenderId: "1091886481728",
  appId: "1:1091886481728:web:607a4e6169238bd31cbaa5"
};

// Firebaseアプリの初期化
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Firebase AuthenticationとFirestoreの初期化
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); // GoogleAuthProviderの初期化

export { auth, db, provider };
