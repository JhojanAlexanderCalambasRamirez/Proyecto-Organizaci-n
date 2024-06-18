// src/components/FileView.js
import React, { useState, useEffect } from 'react';
import { uploadFile, getFileList, deleteFile } from '../services/fileService';

const FileView = ({ userId, folderId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const fileList = await getFileList(userId, folderId);
      setFiles(fileList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchFiles();
  }, [userId, folderId]);

  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadFile(file, userId, folderId);
      // Refresh file list
      const fileList = await getFileList(userId, folderId);
      setFiles(fileList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const handleDeleteFile = async (filePath) => {
    await deleteFile(userId, filePath);
    // Refresh file list
    const fileList = await getFileList(userId, folderId);
    setFiles(fileList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      <input type="file" onChange={handleUploadFile} />
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => handleDeleteFile(file.path)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileView;
