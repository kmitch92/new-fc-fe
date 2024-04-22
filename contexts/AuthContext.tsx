'use client';
import React, {
  useContext,
  useState,
  useEffect,
  // useRef,
  createContext,
  ReactNode,
} from 'react';
import { auth } from '../app/api/firebaseAuth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export interface AuthContextType {
  currentUser: any | null;
  login: Function | null;
  signup: Function | null;
  logout: Function | null;
  // userInfo: any,
}

const dummyInitial: AuthContextType = {
  currentUser: null,
  login: null,
  signup: null,
  logout: null,
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>(dummyInitial);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false);
  // const userRef = useRef();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    // return signInWithEmailAndPassword(auth, email, password)
    return signInWithRedirect(auth, provider).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
        debugger;
      }
      console.log(error);
    });
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
    // userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
