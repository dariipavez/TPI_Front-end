import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import './Navbar.css';
import './Modal.css';
import axios from 'axios';
import ModalLogin from './ModalLogin';
import ModalRegistro from './ModalRegistro';
import ModalContraseña from './ModalContraseña';
import ModalCarrito from './ModalCarrito';
import ModalCarritoBloqueado from './ModalCarritoBloqueado';
import ModalVerificacion from './ModalVerificacion';

const Navbar = ({ onBuscar }) => {
  const [, navegar] = useLocation();

  // Estado para controlar la apertura de cada modal
  const [esModalAbierto, setEsModalAbierto] = useState(false); // Modal de inicio de sesión
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false); // Modal de registro
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false); // Modal del carrito
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false); // Modal de cambiar contraseña
  const [esModalVerificacionAbierto, setEsModalVerificacionAbierto] = useState(false); // Modal de verificación
  const [esMenuPerfilAbierto, setEsMenuPerfilAbierto] = useState(false);
  const [esModalCarritoBloqueadoAbierto, setEsModalCarritoBloqueadoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [logged, setLogged] = useState(!!token);
  const [rol, setRol] = useState(sessionStorage.getItem('rol') || 'usuario');

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    const obtenerCarrito = () => {
      const usuarioId = sessionStorage.getItem('usuario_id');
      const carritoLocal = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
      setCarrito(carritoLocal);
    };
    obtenerCarrito();
  }, [esModalCarritoAbierto]);

  
  const abrirModal = () => {
    setEsModalAbierto(true);
    cerrarModalCarritoBloqueado();
  };
  const cerrarModal = () => setEsModalAbierto(false);
  const abrirModalRegistro = () => {
    setEsModalAbierto(false);
    setEsModalRegistroAbierto(true);
  };
  const cerrarModalRegistro = () => setEsModalRegistroAbierto(false);
  const abrirModalCarrito = () => {
    if (logged) {
      setEsModalCarritoAbierto(true);
    } else {
      setEsModalCarritoBloqueadoAbierto(true);
    }
  };
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);
  const cerrarModalCarritoBloqueado = () => setEsModalCarritoBloqueadoAbierto(false);
  const abrirModalContraseña = () => {
    setEsModalContraseñaAbierto(true);
  };
  const cerrarModalContraseña = () => setEsModalContraseñaAbierto(false);
  const abrirModalVerificacion = () => {
    setEsModalVerificacionAbierto(true);
  };
  const cerrarModalVerificacion = () => setEsModalVerificacionAbierto(false);
  const abrirMenuPerfil = () => {
    setEsMenuPerfilAbierto(!esMenuPerfilAbierto);
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

  const eliminarProducto = (id, talle) => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    const carritoActualizado = carrito.filter(producto => !(producto.id === id && producto.talle === talle));
    setCarrito(carritoActualizado);
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(carritoActualizado));
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

      <div className="menu-iconos">
      {logged ? (
  <span 
    className="icono-usuario" 
    onClick={abrirMenuPerfil}
  >
    👤
    {esMenuPerfilAbierto && (
      <div className="profile-menu">
        <button 
          className="profile-menu-item" 
          onClick={() => navegar('/perfil')}
        >
          Mi cuenta
        </button>
        <button 
          className="profile-menu-item" 
          onClick={() => navegar('/compras')}
        >
          Mis Compras
        </button>
        {rol === 'administrador' && (
          <>
            <button 
              className="profile-menu-item" 
              onClick={() => navegar('/usuarios')}
            >
              Administrar usuarios
            </button>
            <button 
              className="profile-menu-item" 
              onClick={() => navegar('/agregar')}
            >
              Ingresar nuevo producto
            </button>
            <button 
              className="profile-menu-item" 
              onClick={() => navegar('/productos')}
            >
              Gestionar productos
            </button>
          </>
        )}
        <button 
          className="profile-menu-item" 
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    )}
  </span>
) : (
  <span className="icono-usuario" onClick={abrirModal}>👤</span>
)}
<span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>

      </div>

      <ModalLogin
        isOpen={esModalAbierto}
        onClose={cerrarModal}
        onLoginSuccess={(token, rol) => {
          setToken(token);
          setRol(rol);
          setLogged(true);
          alert('Inicio de sesión exitoso');
          cerrarModal();
        }}
        abrirModalVerificacion={abrirModalVerificacion}
        abrirModalRegistro={abrirModalRegistro}
      />

      <ModalRegistro
        isOpen={esModalRegistroAbierto}
        onClose={cerrarModalRegistro}
        onRegisterSuccess={() => {
          alert('Registro exitoso');
          cerrarModalRegistro();
        }}
      />

      <ModalContraseña
        isOpen={esModalContraseñaAbierto}
        onClose={cerrarModalContraseña}
      />

      <ModalCarrito
        isOpen={esModalCarritoAbierto}
        onClose={cerrarModalCarrito}
        carrito={carrito}
        eliminarProducto={eliminarProducto}
        navegar={navegar}
      />

      <ModalCarritoBloqueado
        isOpen={esModalCarritoBloqueadoAbierto}
        onClose={cerrarModalCarritoBloqueado}
        abrirModalLogin={abrirModal}
      />

      <ModalVerificacion
        esAbierto={esModalVerificacionAbierto}
        cerrar={cerrarModalVerificacion}
        abrirModalContraseña={abrirModalContraseña}
      />
    </header>
  );
};

export default Navbar;
