import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../services/AuthProvider';
import { firestore } from '../utils/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Home = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const fetchFolders = async () => {
    const q = query(collection(firestore, 'folders'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const foldersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFolders(foldersList);
  };

  const handleAddFolder = async () => {
    const folderName = prompt('Enter folder name');
    if (!folderName) return;

    await addDoc(collection(firestore, 'folders'), {
      uid: user.uid,
      name: folderName,
      createdAt: new Date(),
    });

    fetchFolders();
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  if (!user) {
    // Si no hay usuario, redirigir automáticamente a la página de login
    navigate('/login');
    return null; // O podrías mostrar un mensaje de carga o algo más mientras se redirige
  }

  return (
    <div>
      <h1>Bienvenido, {user.displayName}</h1>
      <img src={user.photoURL} alt="User profile" width="150" />
      <button onClick={handleSignOut}>Cerrar sesión</button>

      <div>
        <h2>Carpetas</h2>
        <button onClick={handleAddFolder}>Agregar Carpeta</button>
        <ul>
          {folders.map(folder => (
            <li key={folder.id}>
              <span onClick={() => navigate(`/folder/${folder.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                {folder.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
