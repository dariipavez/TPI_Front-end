// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import './Navbar.css';
import './Modal.css';

const Navbar = ({ onBuscar, esMenuPerfilAbierto, setEsMenuPerfilAbierto }) => {
  const [, navegar] = useLocation();

  // Estado para controlar la apertura de cada modal
  const [esModalAbierto, setEsModalAbierto] = useState(false); // Modal de inicio de sesión
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false); // Modal de registro
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false); // Modal del carrito
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false); // Modal de cambiar contraseña

  // Funciones para abrir y cerrar cada modal
  const abrirModal = () => setEsModalAbierto(true);
  const cerrarModal = () => setEsModalAbierto(false);

  const abrirModalRegistro = () => {
    setEsModalAbierto(false);
    setEsModalRegistroAbierto(true);
  };
  const cerrarModalRegistro = () => setEsModalRegistroAbierto(false);

  const abrirModalCarrito = () => setEsModalCarritoAbierto(true);
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);

  const abrirModalContraseña = () => {
    setEsModalAbierto(false);
    setEsModalContraseñaAbierto(true);
  };
  const cerrarModalContraseña = () => setEsModalContraseñaAbierto(false);

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    cerrarModalRegistro();
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
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/remeras')}>
              <strong>Remeras</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/pantalones')}>
              <strong>Pantalones</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/zapatillas')}>
              <strong>Zapatillas</strong>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-deportiva')}>Ropa Deportiva</span>
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/camisetas')}>
              <strong>Camisetas</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/shorts')}>
              <strong>Shorts</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/buzos')}>
              <strong>Buzos</strong>
            </div>
          </div>
        </div>
      </nav>

      <input 
        type="text" 
        placeholder="¿Qué estás buscando?" 
        className="buscador"
        onChange={(e) => onBuscar(e.target.value)} 
      />
      
      <div className="menu-iconos">
        <span 
          className="icono-usuario" 
          onMouseEnter={() => setEsMenuPerfilAbierto(true)}
          onMouseLeave={() => setEsMenuPerfilAbierto(false)}
        >
          {esMenuPerfilAbierto && (
            <div className="profile-menu">
              <button className="profile-menu-item">Mi cuenta</button>
              <button className="profile-menu-item">Cerrar sesión</button>
            </div>
          )}
        </span>

        <span className="icono-usuario" onClick={abrirModal}>👤</span>
        <span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>
      </div>

      {/* Modales */}
      {esModalAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <form>
              <button className="modal-close" onClick={cerrarModal}>X</button>
              <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
              <input type="email" placeholder="Ej: Ejemplo@gmail.com" className="modal-input" />
              <input type="password" placeholder="Ingrese su contraseña" className="modal-input" />
              <button type="submit" className="modal-submit">Entrar</button>
            </form>
            <p><a href="#" onClick={abrirModalContraseña}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene una cuenta? <a href="#" onClick={abrirModalRegistro}>Regístrese</a></p>
          </div>
        </div>
      )}

      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Carro de compras</h2>
            <div className="carrito-producto">
              <img src="puma_suede_xl.jpg" alt="Puma Suede XL" className="carrito-producto-imagen" />
              <div className="carrito-producto-info">
                <h3>Puma Suede XL</h3>
                <p>$65.000</p>
              </div>
            </div>
            <button className="boton-continuar-compra" onClick={() => navegar('/confirmacion')}>Continuar compra</button>
          </div>
        </div>
      )}

      {esModalRegistroAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setEsModalRegistroAbierto(false); setEsModalAbierto(true); }}>Volver</button>
            <form onSubmit={manejarEnvioRegistro}>
              <button className="modal-close" onClick={cerrarModalRegistro}>X</button>
              <h2>Únete a nosotros</h2>
              <input className='modal-input' type="text" placeholder="Nombre completo" required />
              <input type="date" placeholder="Fecha de nacimiento" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input className='modal-input' type="text" placeholder="Nombre de usuario" required />
              <input type="password" placeholder="Contraseña" required />
              <input type="password" placeholder="Confirmar contraseña" required />
              <button type="submit" className="modal-submit-dark">Crear</button>
            </form>
          </div>
        </div>
      )}

      {esModalContraseñaAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setEsModalContraseñaAbierto(false); setEsModalAbierto(true); }}>Volver</button>
            <form>
              <button className="modal-close" onClick={cerrarModalContraseña}>X</button>
              <h2>Cambiar Contraseña</h2>
              <input type="password" placeholder="Nueva contraseña" required />
              <input type="password" placeholder="Confirmar nueva contraseña" required />
              <button type="submit" className="modal-submit-dark">Confirmar</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;