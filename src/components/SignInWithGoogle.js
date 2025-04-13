// src/components/SignInWithGoogle.js
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const SignInWithGoogle = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Signed in with Google');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign In with Google</button>;
};

export default SignInWithGoogle;
