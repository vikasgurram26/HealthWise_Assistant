
'use client';

import {
  type Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
} from 'firebase/auth';
import {
  type Firestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { type SignUpForm } from '@/app/signup/page';
import { type LoginForm } from '@/app/login/page';

/**
 * Creates a user profile document in Firestore if it doesn't already exist.
 * @param db - The Firestore instance.
 * @param user - The Firebase user object.
 * @param additionalData - Additional data to include in the profile, like a name.
 */
async function createUserProfile(
  db: Firestore,
  user: User,
  additionalData: { name?: string } = {}
) {
  const userRef = doc(db, 'userProfiles', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const { email, uid, photoURL } = user;
    const name = additionalData.name || user.displayName || 'Anonymous User';
    await setDoc(userRef, {
      id: uid,
      name,
      email,
      photoURL,
      createdAt: serverTimestamp(),
    });
  }
}

/**
 * Signs up a new user with email and password.
 * @param auth - The Firebase Auth instance.
 * @param db - The Firestore instance.
 * @param data - The sign-up form data (name, email, password).
 */
export async function signUpWithEmailPassword(
  auth: Auth,
  db: Firestore,
  data: SignUpForm
) {
  const { name, email, password } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await createUserProfile(db, userCredential.user, { name });
  return userCredential;
}

/**
 * Signs in a user with email and password.
 * @param auth - The Firebase Auth instance.
 * @param data - The login form data (email, password).
 */
export async function signInWithEmailPassword(auth: Auth, data: LoginForm) {
  const { email, password } = data;
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Signs in a user with their Google account via a popup.
 * @param auth - The Firebase Auth instance.
 * @param db - The Firestore instance.
 */
export async function signInWithGoogle(auth: Auth, db: Firestore) {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await createUserProfile(db, userCredential.user);
  return userCredential;
}

/**
 * Signs out the current user.
 * @param auth - The Firebase Auth instance.
 */
export async function signOutUser(auth: Auth) {
  return signOut(auth);
}
