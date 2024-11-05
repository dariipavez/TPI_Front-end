import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaDetalle from './Tarjetadetalle'; 
import './Detalle.css';
import './Modal.css';

const Detalle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCarritoModalOpen, setIsCarritoModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCarritoModal = () => setIsCarritoModalOpen(true);
  const handleCloseCarritoModal = () => setIsCarritoModalOpen(false);

  return (
    <div className="detalle-pagina">
      <Navbar handleOpenModal={handleOpenModal} handleOpenCarritoModal={handleOpenCarritoModal} />

      <TarjetaDetalle />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <form>
              <button className="modal-close" onClick={handleCloseModal}>
                X
              </button>
              <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
              <input type="email" placeholder="Ej: Ejemplo@gmail.com" className="modal-input" />
              <input type="password" placeholder="Ingrese su contraseña" className="modal-input" />
              <button type="submit" className="modal-submit">Entrar</button>
            </form>
            <p>¿Olvidó su contraseña?</p>
            <p>¿No tiene una cuenta? <a href="#">Regístrese</a></p>
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
            <button className="boton-continuar-compra">Continuar compra</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Detalle;
