// Menu.jsx
import React, { useState } from 'react';
import { Router, Route } from "wouter"; // Importación del Router de wouter
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Tarjetaproductos from './Tarjetaproductos';
import Detalle from './Detalle'; // Importar la nueva pantalla de Detalle
import './Modal.css';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="menu">
        {/* Navbar Component */}
        <Navbar handleOpenModal={handleOpenModal} />

        {/* Grid de Productos */}
        <Route path="/" component={Tarjetaproductos} />

        {/* Ruta hacia la pantalla de detalle */}
        <Route path="/detalle/:productId" component={Detalle} />

        {/* Modal de inicio de sesión */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <form>
                {/* Botón para cerrar el modal */}
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
                <button type="submit" className="modal-submit">
                  Entrar
                </button>
              </form>
              
              <p>¿Olvidó su contraseña?</p>
              <p>¿No tiene una cuenta? <a href="#">Regístrese</a></p>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default Menu;
