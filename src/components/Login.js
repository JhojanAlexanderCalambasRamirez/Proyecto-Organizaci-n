import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginGoogle, loginFacebook } from '../services/AuthService';

const Login = () => {
  const navigate = useNavigate(); // Reemplaza useHistory por useNavigate

  const handleGoogleSignIn = async () => {
    try {
      await loginGoogle();
      navigate('/home'); // Redirige al usuario a la página Home después del inicio de sesión
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await loginFacebook();
      navigate('/home'); // Redirige al usuario a la página Home después del inicio de sesión
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Inicio de sesión</h1>
      <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
      <br />
      <br />
      <button onClick={handleFacebookSignIn}>Iniciar sesión con Facebook</button>

    </div>
    
    
  );
};

export default Login;
