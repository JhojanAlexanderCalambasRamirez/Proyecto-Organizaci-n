// src/services/folderService.js
import { firestore } from '../utils/firebaseConfig';

export const createFolder = (userId, folderName, parentFolderId = null) => {
  const folderRef = firestore.collection('users').doc(userId).collection('folders').doc();
  return folderRef.set({
    name: folderName,
    parentFolderId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getFolderList = (userId, parentFolderId) => {
  return firestore.collection('users').doc(userId).collection('folders').where('parentFolderId', '==', parentFolderId).get();
};

export const deleteFolder = (userId, folderId) => {
  const folderRef = firestore.collection('users').doc(userId).collection('folders').doc(folderId);
  return folderRef.delete();
};
