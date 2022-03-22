import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

export const createUserProfileDocument = async (
  uid: string,
  email: string,
  displayName: string
) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) return;

  setDoc(userRef, {
    displayName,
    email,
    createdAt: new Date(),
  });
};
