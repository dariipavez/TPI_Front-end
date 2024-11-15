import React, { useState } from 'react';
import { Router, Route, useLocation } from "wouter";
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaProductos from './Tarjetaproductos';
import Tarjetadetalle from './Tarjetadetalle';
import './Modal.css';

const Menu = ({ busqueda, onBuscar }) => {
  const [modalAbierto, setModalAbierto] = useState(false); // Modal de inicio de sesión
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false); // Modal de registro
  const [modalCarritoAbierto, setModalCarritoAbierto] = useState(false); // Modal del carrito
  const [modalContraseñaAbierto, setModalContraseñaAbierto] = useState(false); // Modal de cambiar contraseña
  const [, navegar] = useLocation();

  // Funciones para abrir y cerrar el modal de inicio de sesión
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  // Funciones para abrir y cerrar el modal de registro
  const abrirModalRegistro = () => {
    setModalAbierto(false); // Cierra el modal de inicio de sesión
    setModalRegistroAbierto(true); // Abre el modal de registro
  };
  const cerrarModalRegistro = () => setModalRegistroAbierto(false);

  // Funciones para abrir y cerrar el modal del carrito
  const abrirModalCarrito = () => setModalCarritoAbierto(true);
  const cerrarModalCarrito = () => setModalCarritoAbierto(false);

  // Funciones para abrir y cerrar el modal de cambiar contraseña
  const abrirModalContraseña = () => {
    setModalAbierto(false); // Cierra el modal de inicio de sesión
    setModalContraseñaAbierto(true); // Abre el modal de cambiar contraseña
  };
  const cerrarModalContraseña = () => setModalContraseñaAbierto(false);

  // Función para manejar el envío del formulario de registro
  const manejarRegistroSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    cerrarModalRegistro(); // Cierra el modal de registro
    navegar('/'); // Redirige al menú
  };

  return (
    <Router>
      <div className="menu">
        <Navbar 
          handleOpenModal={abrirModal} 
          handleOpenCarritoModal={abrirModalCarrito} // Pasamos la función al Navbar
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