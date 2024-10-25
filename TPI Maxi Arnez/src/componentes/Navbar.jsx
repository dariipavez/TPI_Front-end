import React from 'react';
import './Navbar.css'; // Estilos específicos para el Navbar

const Navbar = ({ handleOpenModal, handleOpenCarrito }) => {
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
        
        {/* Icono del carrito de compras, se abre el modal del carrito */}
        <span className="icono-carrito" onClick={handleOpenCarrito}>🛒</span>
      </div>
    </header>
  );
};

export default Navbar;
