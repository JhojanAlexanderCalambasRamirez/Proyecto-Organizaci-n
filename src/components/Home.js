import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { useAuth } from '../services/authService';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login'); // Redirige a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  // Verifica si user está definido antes de acceder a sus propiedades
  if (!user) {
    // Puedes redirigir a la página de login si el usuario no está autenticado
    return <navigate to="/login" />; // Usa navigate en minúsculas para redirigir
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
