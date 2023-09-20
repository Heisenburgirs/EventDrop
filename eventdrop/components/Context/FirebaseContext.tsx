import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBwf9kBTCEk7AVLLD6RipYPl0O0P95XyZg",
    authDomain: "eventdrop-39456.firebaseapp.com",
    projectId: "eventdrop-39456",
    storageBucket: "eventdrop-39456.appspot.com",
    messagingSenderId: "300531386647",
    appId: "1:300531386647:web:6755d0f79132e6bea14f52",
    measurementId: "G-RB2G1VDCX7"
};

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseApp, setFirebaseApp] = useState<any>(null);

  useEffect(() => {
    if (!firebaseApp) {
      const app = initializeApp(firebaseConfig);
      setFirebaseApp(app);
    }
  }, [firebaseApp]);

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};
