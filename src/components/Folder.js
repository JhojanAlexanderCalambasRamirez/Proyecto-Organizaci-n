import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../services/AuthProvider';
import { firestore, storage } from '../utils/firebaseConfig';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const Folder = () => {
  const { folderId } = useParams();
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `folders/${folderId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(firestore, 'files'), {
      uid: user.uid,
      folderId,
      name: file.name,
      url: downloadURL,
      createdAt: new Date(),
    });

    fetchFiles();
  };

  const fetchFiles = async () => {
    const q = query(collection(firestore, 'files'), where('folderId', '==', folderId));
    const querySnapshot = await getDocs(q);
    const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(filesList);
  };

  const handleDeleteFile = async (fileId, fileName) => {
    const fileRef = ref(storage, `folders/${folderId}/${fileName}`);
    await deleteObject(fileRef);

    const docRef = doc(firestore, 'files', fileId);
    await deleteDoc(docRef);

    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, [folderId]);

  if (!user) {
    // Si no hay usuario, redirigir automáticamente a la página de login
    navigate('/login');
    return null; // O podrías mostrar un mensaje de carga o algo más mientras se redirige
  }

  return (
    <div>
      <h1>Carpeta: {folderId}</h1>
      <button onClick={handleSignOut}>Cerrar sesión</button>
      <button onClick={() => navigate('/home')}>Volver a Inicio</button>

      <div>
        <h2>Subir Archivos</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir</button>
      </div>

      <div>
        <h2>Archivos</h2>
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              <button onClick={() => handleDeleteFile(file.id, file.name)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Folder;
