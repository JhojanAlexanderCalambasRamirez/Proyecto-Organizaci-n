// src/components/FolderView.js
import React, { useState, useEffect } from 'react';
import { createFolder, getFolderList } from '../services/folderService';

const FolderView = ({ userId, parentFolderId }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const folderList = await getFolderList(userId, parentFolderId);
      setFolders(folderList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchFolders();
  }, [userId, parentFolderId]);

  const handleCreateFolder = async () => {
    const folderName = prompt('Enter folder name');
    if (folderName) {
      await createFolder(userId, folderName, parentFolderId);
      // Refresh folder list
      const folderList = await getFolderList(userId, parentFolderId);
      setFolders(folderList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  return (
    <div>
      <button onClick={handleCreateFolder}>Create Folder</button>
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FolderView;
