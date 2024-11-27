import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import ModalLogin from './ModalLogin';
import ModalRegistro from './ModalRegistro';
import ModalContraseña from './ModalContraseña';
import ModalCarrito from './ModalCarrito';
import ModalCarritoBloqueado from './ModalCarritoBloqueado';
import ModalVerificacion from './ModalVerificacion';

const Navbar = ({}) => {
  const [, navegar] = useLocation();

  const [esModalAbierto, setEsModalAbierto] = useState(false);
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false);
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false);
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false);
  const [esModalVerificacionAbierto, setEsModalVerificacionAbierto] = useState(false);
  const [esMenuPerfilAbierto, setEsMenuPerfilAbierto] = useState(false);
  const [esModalCarritoBloqueadoAbierto, setEsModalCarritoBloqueadoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [logged, setLogged] = useState(!!token);
  const [rol, setRol] = useState(sessionStorage.getItem('rol') || 'usuario');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
      setLogged(true);
    }
  
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
    <header className="menu-header flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="logo cursor-pointer" onClick={() => navegar('/')}>
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen w-24" />
      </div>

      <nav className="menu-categorias flex space-x-4">
        <div className="menu-item cursor-pointer hover:underline" onClick={() => navegar('/ropa-urbana')}>
          <span>Ropa Urbana</span>
        </div>
        <div className="menu-item cursor-pointer hover:underline" onClick={() => navegar('/ropa-deportiva')}>
          <span>Ropa Deportiva</span>
        </div>
      </nav>

      <div className="menu-iconos flex space-x-4">
        {logged ? (
          <span className="icono-usuario relative cursor-pointer" onClick={abrirMenuPerfil}>
            👤
            {esMenuPerfilAbierto && (
              <div className="profile-menu absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navegar('/perfil')}>
                  Mi cuenta
                </button>
                <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navegar('/compras')}>
                  Mis Compras
                </button>
                {rol === 'administrador' && (
                  <>
                    <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navegar('/usuarios')}>
                      Administrar usuarios
                    </button>
                    <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navegar('/agregar')}>
                      Ingresar nuevo producto
                    </button>
                    <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navegar('/productos')}>
                      Gestionar productos
                    </button>
                  </>
                )}
                <button className="profile-menu-item w-full text-left px-4 py-2 hover:bg-gray-200" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </span>
        ) : (
          <span className="icono-usuario cursor-pointer" onClick={abrirModal}>👤</span>
        )}
        <span className="icono-carrito cursor-pointer" onClick={abrirModalCarrito}>🛒</span>
      </div>

      <ModalLogin
        isOpen={esModalAbierto}
        onClose={cerrarModal}
        onLoginSuccess={(token, rol) => {
          setToken(token);
          setRol(rol);
          setLogged(true);
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

export default Navbar;