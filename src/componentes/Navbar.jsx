import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import './Navbar.css';
import ModalLogin from './ModalLogin'; 
import ModalCarrito from './ModalCarrito';
const Navbar = ({ onBuscar }) => {
  const [, navegar] = useLocation();

  // Estado para controlar la apertura de cada modal
  const [esModalLoginAbierto, setEsModalLoginAbierto] = useState(false);
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false);
  const [esModalVerificacionAbierto, setEsModalVerificacionAbierto] = useState(false);
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false);
  const [esMenuPerfilAbierto, setEsMenuPerfilAbierto] = useState(false);

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [logged, setLogged] = useState(!!token);
  const [rol, setRol] = useState(sessionStorage.getItem('rol') || 'usuario');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('rol');
    if (token) {
      setToken(token);
      setLogged(true);
      if (userRole) {
        setRol(userRole);
      }
    }
  }, []);

  const abrirMenuPerfil = () => {
    setEsMenuPerfilAbierto(!esMenuPerfilAbierto);
  };

  const abrirModalLogin = () => setEsModalLoginAbierto(true);
  const cerrarModalLogin = () => setEsModalLoginAbierto(false);
  const abrirModalCarrito = () => setEsModalCarritoAbierto(true);
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);

  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        console.log('Respuesta completa del servidor:', resp.data);
        if (resp.data.status === "ok") {
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario_id', resp.data.usuario_id);
          sessionStorage.setItem('rol', resp.data.rol);
          setToken(resp.data.token);
          setRol(resp.data.rol);
          setLogged(true);
          setEsModalLoginAbierto(false);
          setEsMenuPerfilAbierto(true);  // Abrir el menú de perfil inmediatamente
          alert('Inicio de sesión exitoso');
        } else {
          alert('No se pudo conectar al servidor');
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Usuario/Contraseña incorrecta");
      });
  };

  const cerrarSesion = () => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('usuario_id');
    localStorage.removeItem(`carrito_${usuarioId}`);
    setToken(null);
    setRol('usuario');
    setLogged(false);
    setEsMenuPerfilAbierto(false);
    alert('Sesión cerrada correctamente');
    navegar('/');
  };

  return (
    <header className="menu-header">
      <div className="logo" onClick={() => navegar('/')}>
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen" />
      </div>

      <nav className="menu-categorias">
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-urbana')}>Ropa Urbana</span>
        </div>
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-deportiva')}>Ropa Deportiva</span>
        </div>
      </nav>

      <input
        type="text"
        placeholder="¿Qué estás buscando?"
        className="buscador"
        onChange={(e) => onBuscar(e.target.value)}
      />

      <div className="menu-iconos">
        {logged ? (
          <span className="icono-usuario" onClick={abrirMenuPerfil}>
            👤
            {esMenuPerfilAbierto && (
              <div className="profile-menu">
                <button className="profile-menu-item" onClick={() => navegar('/perfil')}>
                  Mi cuenta
                </button>
                {rol === 'administrador' && (
                  <>
                    <button className="profile-menu-item" onClick={() => navegar('/usuarios')}>
                      Administrar usuarios
                    </button>
                    <button className="profile-menu-item" onClick={() => navegar('/agregar')}>
                      Ingresar nuevo producto
                    </button>
                  </>
                )}
                <button className="profile-menu-item" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </span>
        ) : (
          <span className="icono-usuario" onClick={abrirModalLogin}>👤</span>
        )}
        <ModalCarrito esAbierto={esModalCarritoAbierto} cerrar={cerrarModalCarrito} />
      </div>

      <ModalLogin esAbierto={esModalLoginAbierto} cerrar={cerrarModalLogin} onLogin={loguearse} />
    </header>
  );
};

export default Navbar;


      