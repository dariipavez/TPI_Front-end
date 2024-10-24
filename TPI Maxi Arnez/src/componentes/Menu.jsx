// Menu.jsx
import React, { useState } from 'react';
import './Menu.css';
import Navbar from './Navbar';
import TarjetaProductos from './Tarjetaproductos'; // Importamos el nuevo componente TarjetaProductos
import Modal from './Modal';
import Footer from './Footer';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="menu">
      {/* Navbar Component */}
      <Navbar handleOpenModal={handleOpenModal} />

      {/* Grid de Productos */}
      <TarjetaProductos />

      {/* Modal de inicio de sesión */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Menu;
