import { defineStore } from "pinia";

import {
  User,
  UserCredential,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { createUserProfileDocument } from "./../firebase/utils_firestore";

const USER_STORAGE_KEY = "user";

interface State {
  currentUser: null | User;
}

const getUserFromLocalStorage = (): User | null => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  if (!userData) return null;
  const userObj: User = JSON.parse(userData);
  return userObj;
};

const useUserStore = defineStore("user", {
  state: (): State => ({
    currentUser: getUserFromLocalStorage() || null,
  }),

  actions: {
    setUser(userData: User) {
      this.currentUser = userData;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    },

    signOut() {
      getAuth().signOut();
      this.currentUser = null;
      localStorage.removeItem(USER_STORAGE_KEY);
    },

    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(getAuth(), provider);
      this.setUser(user);
      createUserProfileDocument(
        user.uid,
        user.email ?? "",
        user.displayName ?? ""
      );
    },

    async signInWithEmail(email: string, password: string) {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      this.setUser(user);
    },

    async signUpWithEmail(
      displayName: string,
      email: string,
      password: string
    ) {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      this.setUser(user);
      createUserProfileDocument(user.uid, email, displayName);
    },
  },
});

export default useUserStore;
