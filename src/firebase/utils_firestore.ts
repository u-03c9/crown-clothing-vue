import { Collections } from "./../pinia/shopStore";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";

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

export const fetchCollections = async (): Promise<Collections> => {
  const db = getFirestore();
  const collectionsRef = collection(db, "collections");
  const snapshot = await getDocs(collectionsRef);
  return convertCollectionsSnapshotToMap(snapshot);
};

const convertCollectionsSnapshotToMap = (
  snapshot: QuerySnapshot<DocumentData>
): Collections => {
  const transformedCollections = snapshot.docs.map((doc: DocumentData) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce(
    (accumulator: any, collection: DocumentData) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },
    {}
  );
};
