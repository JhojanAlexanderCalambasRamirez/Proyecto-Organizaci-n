import React, { useState, useEffect } from 'react';
import { createFolder, getFolders } from '../services/FolderService';

const FolderView = ({ userId }) => {
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const userFolders = await getFolders(userId);
      setFolders(userFolders);
    };
    fetchFolders();
  }, [userId]);

  const handleCreateFolder = async () => {
    if (folderName.trim() === '') return;
    const newFolder = await createFolder(userId, folderName);
    setFolders([...folders, newFolder]);
    setFolderName('');
  };

  return (
    <div>
      <h2>Folders</h2>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Folder name"
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FolderView;
