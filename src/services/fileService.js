import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const storage = getStorage();
const db = getFirestore();

export const uploadFile = async (userId, folderId, file) => {
  const fileRef = ref(storage, `files/${userId}/${folderId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  await addDoc(collection(db, 'files'), {
    userId,
    folderId,
    name: file.name,
    url: downloadURL,
    createdAt: new Date(),
  });
};
