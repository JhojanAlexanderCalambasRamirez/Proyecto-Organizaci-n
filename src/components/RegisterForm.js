// src/components/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, loginGoogle, loginFacebook } from '../services/AuthService';

const RegisterForm = () => {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error('Error during email sign-up:', error);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleEmailSignUp}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register-button">Crear Cuenta</button>
      </form>
      <div className="social-buttons">
        <button onClick={loginGoogle} className="social-button">Registrarse con Google</button>
        <button onClick={loginFacebook} className="social-button">Registrarse con Facebook</button>
      </div>
      <div>
        <button onClick={goToHome} className="back-button">Volver a la página principal</button>
      </div>
    </div>
  );
};

export default RegisterForm;
