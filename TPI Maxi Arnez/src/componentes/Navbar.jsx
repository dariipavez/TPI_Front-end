// Navbar.jsx
import React from 'react';
import './Navbar.css'; // Estilos específicos para el Navbar

const Navbar = ({ handleOpenModal }) => {
  return (
    <header className="menu-header">
      <div className="logo">⭐</div>
      <nav className="menu-categorias">
        <a href="/">Ropa Urbana</a>
        <a href="/">Ropa Deportiva</a>
      </nav>
      <input type="text" placeholder="¿Qué estás buscando?" className="buscador" />
      <div className="menu-iconos">
        {/* Al hacer clic en el icono del usuario, se abre el modal */}
        <span className="icono-usuario" onClick={handleOpenModal}>👤</span>
        <span className="icono-carrito">🛒</span>
        <span className="icono-favoritos">⭐</span>
      </div>
    </header>
  );
};

export default Navbar;
