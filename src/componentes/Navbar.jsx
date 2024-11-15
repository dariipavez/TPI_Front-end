// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import './Navbar.css';
import './Modal.css';

const Navbar = ({ onBuscar, isProfileMenuOpen, setIsProfileMenuOpen }) => {
  const [, navigate] = useLocation();

  // Estado para controlar la apertura de cada modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de inicio de sesión
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Modal de registro
  const [isCarritoModalOpen, setIsCarritoModalOpen] = useState(false); // Modal del carrito
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Modal de cambiar contraseña

  // Funciones para abrir y cerrar cada modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenRegisterModal = () => {
    setIsModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  const handleOpenCarritoModal = () => setIsCarritoModalOpen(true);
  const handleCloseCarritoModal = () => setIsCarritoModalOpen(false);

  const handleOpenPasswordModal = () => {
    setIsModalOpen(false);
    setIsPasswordModalOpen(true);
  };
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    handleCloseRegisterModal();
    navigate('/');
  };

  return (
    <header className="menu-header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen" />
      </div>
      
      <nav className="menu-categorias">
        <div className="menu-item">
          <span onClick={() => navigate('/ropa-urbana')}>Ropa Urbana</span>
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navigate('/ropa-urbana/remeras')}>
              <strong>Remeras</strong>
            </div>
            <div className="dropdown-column" onClick={() => navigate('/ropa-urbana/pantalones')}>
              <strong>Pantalones</strong>
            </div>
            <div className="dropdown-column" onClick={() => navigate('/ropa-urbana/zapatillas')}>
              <strong>Zapatillas</strong>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <span onClick={() => navigate('/ropa-deportiva')}>Ropa Deportiva</span>
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navigate('/ropa-deportiva/camisetas')}>
              <strong>Camisetas</strong>
            </div>
            <div className="dropdown-column" onClick={() => navigate('/ropa-deportiva/shorts')}>
              <strong>Shorts</strong>
            </div>
            <div className="dropdown-column" onClick={() => navigate('/ropa-deportiva/buzos')}>
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
          onMouseEnter={() => setIsProfileMenuOpen(true)}
          onMouseLeave={() => setIsProfileMenuOpen(false)}
        >
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <button className="profile-menu-item">Mi cuenta</button>
              <button className="profile-menu-item">Cerrar sesión</button>
            </div>
          )}
        </span>

        <span className="icono-usuario" onClick={handleOpenModal}>👤</span>
        <span className="icono-carrito" onClick={handleOpenCarritoModal}>🛒</span>
      </div>

      {/* Modales */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <form>
              <button className="modal-close" onClick={handleCloseModal}>X</button>
              <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
              <input type="email" placeholder="Ej: Ejemplo@gmail.com" className="modal-input" />
              <input type="password" placeholder="Ingrese su contraseña" className="modal-input" />
              <button type="submit" className="modal-submit">Entrar</button>
            </form>
            <p><a href="#" onClick={handleOpenPasswordModal}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene una cuenta? <a href="#" onClick={handleOpenRegisterModal}>Regístrese</a></p>
          </div>
        </div>
      )}

      {isCarritoModalOpen && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            <button className="modal-close" onClick={handleCloseCarritoModal}>X</button>
            <h2>Carro de compras</h2>
            <div className="carrito-producto">
              <img src="puma_suede_xl.jpg" alt="Puma Suede XL" className="carrito-producto-imagen" />
              <div className="carrito-producto-info">
                <h3>Puma Suede XL</h3>
                <p>$65.000</p>
              </div>
            </div>
            <button className="boton-continuar-compra" onClick={() => navigate('/confirmacion')}>Continuar compra</button>
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setIsRegisterModalOpen(false); setIsModalOpen(true); }}>Volver</button>
            <form onSubmit={handleRegisterSubmit}>
              <button className="modal-close" onClick={handleCloseRegisterModal}>X</button>
              <h2>Únete a nosotros</h2>
              <input type="text" placeholder="Nombre completo" required />
              <input type="date" placeholder="Fecha de nacimiento" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input type="text" placeholder="Nombre de usuario" required />
              <input type="password" placeholder="Contraseña" required />
              <input type="password" placeholder="Confirmar contraseña" required />
              <button type="submit" className="modal-submit-dark">Crear</button>
            </form>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setIsPasswordModalOpen(false); setIsModalOpen(true); }}>Volver</button>
            <form>
              <button className="modal-close" onClick={handleClosePasswordModal}>X</button>
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
