// authService.js
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import app from '../utils/firebaseConfig';

const auth = getAuth(app);

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const loginFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during Facebook sign-in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await loginGoogle();
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      await loginFacebook();
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  };

  return { user, loading, signInWithGoogle, signInWithFacebook, signOut };
};
