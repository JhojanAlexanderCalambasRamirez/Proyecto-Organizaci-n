import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

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
    </div>
  );
};

export default Home;
