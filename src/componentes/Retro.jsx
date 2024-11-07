import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Retro.css';

const Retro = () => {
  const productosRetro = [
    { id: 1, nombre: 'Camiseta Retro 1', descripcion: 'Descripción de la camiseta retro 1', precio: '$40' },
    { id: 2, nombre: 'Camiseta Retro 2', descripcion: 'Descripción de la camiseta retro 2', precio: '$45' },
    { id: 3, nombre: 'Camiseta Retro 3', descripcion: 'Descripción de la camiseta retro 3', precio: '$50' },
    { id: 4, nombre: 'Camiseta Retro 4', descripcion: 'Descripción de la camiseta retro 4', precio: '$55' },
  ];

  return (
    <div className="retro-container">
      <Navbar />
      <div className="retro-content">
        <h2>Camisetas Retro</h2>
        <div className="productos">
          {productosRetro.map((producto) => (
            <div key={producto.id} className="producto-card">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>{producto.precio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Retro;
