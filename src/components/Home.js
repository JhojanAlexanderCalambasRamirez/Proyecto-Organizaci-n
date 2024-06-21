import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../services/AuthProvider';
import { firestore } from '../utils/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import '../App.css';

const Home = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
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
    navigate('/login');
    return null;
  }

  return (
    <div className="home full-height text-center">
      <div className="background-image" style={{ backgroundImage: `url('https://uploads-ssl.webflow.com/612e51f97cd5712b11eaca4d/62a1141737dfd2778b06bd5f_pexels-pixabay-357514.jpg')` }}></div>
      <div className="container">
        <div className="user-section">
          <h1>Bienvenido, {user.displayName}</h1>
          <img className="user-photo" src={user.photoURL} alt="User profile" />
          <button className="signout-button" onClick={handleSignOut}>Cerrar sesión</button>
        </div>
        <div className="folders-section">
          <h2>Carpetas</h2>
          <button className="add-folder-button" onClick={handleAddFolder}>Agregar Carpeta</button>
          <ul className="folders-list">
            {folders.map(folder => (
              <li key={folder.id}>
                <span className="folder-link" onClick={() => navigate(`/folder/${folder.id}`)}>
                  {folder.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
