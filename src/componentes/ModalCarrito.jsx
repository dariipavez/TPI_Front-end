import React, { useState } from 'react';
import './Modal.css';

const ModalCarrito = () => {
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false);

  const abrirModalCarrito = () => setEsModalCarritoAbierto(true);
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);

  return (
    <>
      <span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>
      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Carrito</h2>
            <p>Carrito vacío</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCarrito;