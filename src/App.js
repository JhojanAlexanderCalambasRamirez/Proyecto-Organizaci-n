// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import Folder from './components/Folder';
import MainPage from './components/MainPage';
import './App.css'; // Importa los estilos globales

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* Cambiado para que MainPage sea la página de inicio */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/folder/:folderId" element={<Folder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
