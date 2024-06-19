import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Bienvenido a nuestra aplicación!</h1>
      <p>Aquí puedes encontrar información sobre la aplicación y sus características.</p>
      <div>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button>Crear Cuenta</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
