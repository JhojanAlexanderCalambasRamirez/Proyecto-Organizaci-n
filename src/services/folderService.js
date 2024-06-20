import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export const createFolder = async (userId, folderName) => {
  const docRef = await addDoc(collection(db, 'folders'), {
    userId,
    name: folderName,
    createdAt: new Date(),
  });
  return { id: docRef.id, name: folderName };
};

export const getFolders = async (userId) => {
  const q = query(collection(db, 'folders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const folders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return folders;
};

export const categorizeFolder = async (folderId, category) => {
  const folderRef = doc(db, 'folders', folderId);
  await updateDoc(folderRef, {
    category,
  });
};
