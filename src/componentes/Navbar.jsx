import React from 'react';
import './Navbar.css';

const Navbar = ({ handleOpenModal, handleOpenCarrito }) => {
  return (
    <header className="menu-header">
      {/* Logo reemplazado con una imagen */}
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

      <input type="text" placeholder="¿Qué estás buscando?" className="buscador" />
      
      <div className="menu-iconos">
        <span className="icono-usuario" onClick={handleOpenModal}>👤</span>
        <span className="icono-carrito" onClick={handleOpenCarrito}>🛒</span>
      </div>
    </header>
  );
};

export default Navbar;