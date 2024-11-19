// src/components/TarjetaConfirmacion.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';
import './TarjetaConfirmacion.css';

const TarjetaConfirmacion = () => {
  const [, setUbicacion] = useLocation();  // Cambiado para reflejar el contexto en español
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const obtenerCarrito = () => {
      const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(carritoLocal);
    };
    obtenerCarrito();
  }, []);

  const manejarProcederAlPago = () => {
    setUbicacion('/Info');  // Redirige a la página de TarjetaInfo
  };

  const eliminarProducto = (id) => {
    const carritoActualizado = carrito.filter(producto => producto.id !== id);
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  };

  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

  return (
    <div className="tarjeta-confirmacion-pagina">
      <Navbar />

      <div className="tarjeta-confirmacion-contenido">
        {carrito.map((producto, index) => (
          <div key={index} className="tarjeta-confirmacion">
            <img src={`http://localhost:3000/uploads/${producto.imagen.split('\\').pop()}`} alt={producto.nombre} className="tarjeta-imagen" />
            <div className="tarjeta-detalle">
              <h3>{producto.nombre}</h3>
              <p>Talle: {producto.talle}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Total: ${producto.precio * producto.cantidad}</p>
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        
        <div className="tarjeta-total">
          <h3>Total a pagar: ${total}</h3>
        </div>

        <div className="boton-proceder">
          <button onClick={manejarProcederAlPago}>Proceder al pago</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaConfirmacion;
