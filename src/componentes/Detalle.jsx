import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaDetalle from './Tarjetadetalle'; // Componente de detalle del producto
import './Detalle.css';
import './Modal.css';

const Detalle = () => {
  // Estado de los modals
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de inicio de sesión
  const [isCarritoOpen, setIsCarritoOpen] = useState(false); // Modal del carrito

  // Funciones para abrir y cerrar el modal de inicio de sesión
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Funciones para abrir y cerrar el modal del carrito
  const handleOpenCarrito = () => setIsCarritoOpen(true);
  const handleCloseCarrito = () => setIsCarritoOpen(false);

  return (
    <div className="detalle-pagina">
      {/* Incluye el Navbar con los controladores de los modals */}
      <Navbar handleOpenModal={handleOpenModal} handleOpenCarrito={handleOpenCarrito} />

      {/* Tarjeta de detalle del producto */}
      <TarjetaDetalle />

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

      {/* Incluye el Footer */}
      <Footer />
    </div>
  );
};

export default Detalle;
