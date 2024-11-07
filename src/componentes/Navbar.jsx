import React from 'react';
import './Navbar.css';

const Navbar = ({ handleOpenModal, handleOpenCarritoModal, onBuscar, isProfileMenuOpen, setIsProfileMenuOpen }) => {
  return (
    <header className="menu-header">
      <div className="logo">
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen" />
      </div>
      
      <nav className="menu-categorias">
        <div className="menu-item">
          <a href="/">Ropa Urbana</a>
          <div className="dropdown-menu">
            <div className="dropdown-column">
              <strong>Remeras</strong>
              <ul>
                <button className="dropdown-button">Oversize</button>
                <button className="dropdown-button">Boxy fit</button>
              </ul>
            </div>
            <div className="dropdown-column">
              <strong>Pantalones</strong>
              <ul>
                <button className="dropdown-button">Mom</button>
                <button className="dropdown-button">Baggy</button>
              </ul>
            </div>
            <div className="dropdown-column">
              <strong>Zapatillas</strong>
              <ul>
                <button className="dropdown-button">Puma</button>
                <button className="dropdown-button">Adidas</button>
              </ul>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <a href="/">Ropa Deportiva</a>
          <div className="dropdown-menu">
            <div className="dropdown-column">
              <strong>Camisetas</strong>
              <ul>
                <button className="dropdown-button">Retro</button>
                <button className="dropdown-button">Actuales</button>              
              </ul>
            </div>
            <div className="dropdown-column">
              <strong>Shorts</strong>
              <ul>
                <button className="dropdown-button">Bermudas</button>
                <button className="dropdown-button">Potrero</button>
              </ul>
            </div>
            <div className="dropdown-column">
              <strong>Buzos</strong>
              <ul>
                <button className="dropdown-button">Medio cierre</button>
                <button className="dropdown-button">Sin capucha</button>
              </ul>
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
          👤
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <button className="profile-menu-item">Mi cuenta</button>
              <button className="profile-menu-item">Cerrar sesión</button>
            </div>
          )}
        </span>
        <span className="icono-carrito" onClick={handleOpenCarritoModal}>🛒</span>
      </div>
    </header>
  );
};

export default Navbar;
