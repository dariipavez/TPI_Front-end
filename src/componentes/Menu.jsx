import React, { useState } from 'react';
import { Router, Route, useLocation } from "wouter";
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaProductos from './Tarjetaproductos';
import Detalle from './Detalle';
import './Modal.css';

const Menu = ({ busqueda, onBuscar }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCarritoModalOpen, setIsCarritoModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [, navigate] = useLocation();

  // Funciones para abrir y cerrar el modal de inicio de sesión
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Funciones para abrir y cerrar el modal de registro
  const handleOpenRegisterModal = () => {
    setIsModalOpen(false); // Cierra el modal de inicio de sesión
    setIsRegisterModalOpen(true); // Abre el modal de registro
  };
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Funciones para abrir y cerrar el modal del carrito
  const handleOpenCarritoModal = () => setIsCarritoModalOpen(true);
  const handleCloseCarritoModal = () => setIsCarritoModalOpen(false);


  const handleContinuarCompra = () => {
    navigate('/carrito');

  // Función para manejar el envío del formulario de registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    handleCloseRegisterModal(); // Cierra el modal de registro
    navigate('/'); // Redirige al menú
  };

  return (
    <Router>
      <div className="menu">
        <Navbar 
          handleOpenModal={handleOpenModal} 
          handleOpenCarritoModal={handleOpenCarritoModal} 
          onBuscar={onBuscar} 
          isProfileMenuOpen={isProfileMenuOpen}
          setIsProfileMenuOpen={setIsProfileMenuOpen}

        />

        <Route path="/" component={() => <TarjetaProductos busqueda={busqueda} />} />
        <Route path="/detalle/:productId" component={Detalle} />

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <form>
                <button className="modal-close" onClick={handleCloseModal}>X</button>
                <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
                <input type="email" placeholder="Ej: Ejemplo@gmail.com" className="modal-input" />
                <input type="password" placeholder="Ingrese su contraseña" className="modal-input" />
                <button type="submit" className="modal-submit">Entrar</button>
              </form>
              <p>¿Olvidó su contraseña?</p>
              <p>¿No tiene una cuenta? <a href="#" onClick={handleOpenRegisterModal}>Regístrese</a></p>
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
              <button className="boton-continuar-compra" onClick={() => navigate('/carrito')}>Continuar compra</button>
            </div>
          </div>
        )}

        {/* Modal de registro */}
        {isRegisterModalOpen && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              {/* Botón para volver al modal de inicio de sesión */}
              <button className="modal-back" onClick={() => { setIsRegisterModalOpen(false); setIsModalOpen(true); }}>
                Volver
              </button>
              <form onSubmit={handleRegisterSubmit}>
                <button className="modal-close" onClick={handleCloseRegisterModal}>X</button>
                <h2>Únete a nosotros</h2>
                <input type="text" placeholder="Nombre completo" required />
                <input type="date" placeholder="Fecha de nacimiento" required />
                <input type="email" placeholder="Correo electrónico" required />
                <input type="text" placeholder="Nombre de usuario" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar contraseña" required />
                <button type="submit" className="modal-submit-dark">Crear</button>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
};
}
export default Menu;

