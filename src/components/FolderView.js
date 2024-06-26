import React, { useState } from 'react';
import { createFolder } from '../services/FolderService';

const FolderView = ({ userId }) => {
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);

  const handleCreateFolder = async () => {
    if (folderName.trim() === '') return;
    const newFolder = await createFolder(userId, folderName);
    setFolders([...folders, newFolder]);
    setFolderName('');
  };

  return (
    <div>
      <h1>Folders</h1>
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
