import React, { useState } from 'react';
import { Router, Route, useLocation } from "wouter";
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaProductos from './Tarjetaproductos';
import Tarjetadetalle from './Tarjetadetalle';
import './Modal.css';

const Menu = ({ busqueda, onBuscar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de inicio de sesión
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Modal de registro
  const [isCarritoModalOpen, setIsCarritoModalOpen] = useState(false); // Modal del carrito
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Modal de cambiar contraseña
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

  // Funciones para abrir y cerrar el modal de cambiar contraseña
  const handleOpenPasswordModal = () => {
    setIsModalOpen(false); // Cierra el modal de inicio de sesión
    setIsPasswordModalOpen(true); // Abre el modal de cambiar contraseña
  };
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

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
          handleOpenCarritoModal={handleOpenCarritoModal} // Pasamos la función al Navbar
          onBuscar={onBuscar} 
        />

        <Route path="/" component={() => <TarjetaProductos busqueda={busqueda} />} />
        <Route path="/detalle/:productId" component={Tarjetadetalle} />

        <Footer />
      </div>
    </Router>
  );
};

export default Menu;