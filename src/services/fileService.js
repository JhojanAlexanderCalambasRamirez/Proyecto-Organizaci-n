// src/services/fileService.js
import { storage, firestore } from '../utils/firebaseConfig';

export const uploadFile = (file, userId, folderId) => {
  const fileRef = storage.ref(`${userId}/${folderId}/${file.name}`);
  return fileRef.put(file).then(snapshot => snapshot.ref.getDownloadURL());
};

export const getFileList = (userId, folderId) => {
  return firestore.collection('users').doc(userId).collection('files').where('folderId', '==', folderId).get();
};

export const deleteFile = (userId, filePath) => {
  const fileRef = storage.ref(filePath);
  return fileRef.delete();
};
