// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginGoogle, loginFacebook } from '../services/AuthService';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await loginGoogle();
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await loginFacebook();
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de sesión</h1>
      <button onClick={handleGoogleSignIn} className="login-button">Iniciar sesión con Google</button>
      <button onClick={handleFacebookSignIn} className="login-button">Iniciar sesión con Facebook</button>
    </div>
  );
};

export default Login;
