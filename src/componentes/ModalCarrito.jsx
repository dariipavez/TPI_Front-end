import React from 'react';
import './Modal.css';

const ModalCarrito = ({ isOpen, onClose, carrito, eliminarProducto, navegar }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-carrito">
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>Carro de compras</h2>
          <div className="carrito-contenido">
            {carrito.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              carrito.map((producto, index) => (
                <div key={index} className="carrito-producto">
                  <img src={producto.ruta_imagen} alt={producto.nombre} className="carrito-producto-imagen" />
                  <div className="carrito-producto-info">
                    <h3>{producto.nombre}</h3>
                    <p>Talle: {producto.talle}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio: ${producto.precio}</p>
                    <button onClick={() => eliminarProducto(producto.id, producto.talle)}>Eliminar</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="boton-continuar-compra" onClick={() => navegar('/confirmacion')}>Continuar compra</button>
        </div>
      </div>
    )
  );
};

export default ModalCarrito;
