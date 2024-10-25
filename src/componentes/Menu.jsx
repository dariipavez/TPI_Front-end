import React, { useState } from 'react';
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Tarjetaproductos from './Tarjetaproductos';
import './Modal.css';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de inicio de sesión
  const [isCarritoOpen, setIsCarritoOpen] = useState(false); // Estado del modal del carrito

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCarrito = () => setIsCarritoOpen(true);
  const handleCloseCarrito = () => setIsCarritoOpen(false);

  return (
    <div className="menu">
      {/* Navbar Component */}
      <Navbar handleOpenModal={handleOpenModal} handleOpenCarrito={handleOpenCarrito} />

      {/* Grid de Productos */}
      <Tarjetaproductos />

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

      {/* Modal del carrito de compras */}
      {isCarritoOpen && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            {/* Botón para cerrar el modal del carrito */}
            <button className="modal-close" onClick={handleCloseCarrito}>
              X
            </button>
            
            <h2>Carro de compras</h2>
            
            {/* Ejemplo de contenido del carrito */}
            <div className="carrito-producto">
              <img 
                src="puma_suede_xl.jpg" 
                alt="Puma Suede XL" 
                className="carrito-producto-imagen" 
              />
              <div className="carrito-producto-info">
                <h3>Puma Suede XL</h3>
                <p>$65.000</p>
              </div>
            </div>
            
            {/* Botón para continuar con la compra */}
            <button className="boton-continuar-compra">
              Continuar compra
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Menu;

