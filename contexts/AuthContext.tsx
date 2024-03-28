'use client';
import React, {
  useContext,
  useState,
  useEffect,
  // useRef,
  createContext,
  ReactNode,
} from 'react';
import { auth } from '../api/firebaseAuth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

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
    return signInWithEmailAndPassword(auth, email, password);
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
