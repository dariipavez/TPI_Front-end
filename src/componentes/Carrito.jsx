import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Tarjetaconfirmacion from './Tarjetaconfirmacion';
import './Carrito.css';

const Carrito = () => {
  return (
    <div className="carrito-pagina">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido principal de la página Carrito */}
      <div className="carrito-contenido">
        <Tarjetaconfirmacion />
      </div>

      {/* Footer abajo */}
      <Footer />
    </div>
  );
};

export default Carrito;

