// Menu.jsx
import React, { useState } from 'react';
import { Router, Route } from "wouter";
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaProductos from './Tarjetaproductos';
import Detalle from './Detalle';
import './Modal.css';

const Menu = ({ busqueda, onBuscar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="menu">
        <Navbar handleOpenModal={handleOpenModal} onBuscar={onBuscar} />
        <Route path="/" component={() => <TarjetaProductos busqueda={busqueda} />} />
        <Route path="/detalle/:productId" component={Detalle} />

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <form>
                <button className="modal-close" onClick={handleCloseModal}>
                  X
                </button>
                <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
                <input 
                  type="email" 
                  placeholder="Ej: Ejemplo@gmail.com" 
                  className="modal-input"
                />
                <input 
                  type="password" 
                  placeholder="Ingrese su contraseña" 
                  className="modal-input"
                />
                <button type="submit" className="modal-submit">Entrar</button>
              </form>
              <p>¿Olvidó su contraseña?</p>
              <p>¿No tiene una cuenta? <a href="#">Regístrese</a></p>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default Menu;
