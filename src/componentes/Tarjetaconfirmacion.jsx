import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';

const TarjetaConfirmacion = () => {
  const [, setUbicacion] = useLocation();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const obtenerCarrito = () => {
      const usuarioId = sessionStorage.getItem('usuario_id');
      const carritoLocal = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
      setCarrito(carritoLocal);
    };
    obtenerCarrito();
  }, []);

  const manejarProcederAlPago = () => {
    setUbicacion('/Info');
  };

  const eliminarProducto = (id, talle) => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    const carritoActualizado = carrito.filter(producto => !(producto.id === id && producto.talle === talle));
    setCarrito(carritoActualizado);
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(carritoActualizado));
  };

  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow p-6">
        {carrito.length === 0 ? (
          <div className="text-center text-lg text-gray-700">El carrito está vacío</div>
        ) : (
          <div className="space-y-4">
            {carrito.map((producto, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 flex items-center">
                <img src={producto.ruta_imagen} alt={producto.nombre} className="w-24 h-24 object-cover rounded-lg mr-6" />
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>
                  <p className="text-gray-700">Talle: {producto.talle}</p>
                  <p className="text-gray-700">Cantidad: {producto.cantidad}</p>
                  <p className="text-gray-700">Precio: ${producto.precio}</p>
                  <p className="text-gray-700">Total: ${producto.precio * producto.cantidad}</p>
                </div>
                <button
                  onClick={() => eliminarProducto(producto.id, producto.talle)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold">Total a pagar: ${total}</h3>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={manejarProcederAlPago}
            className="w-full max-w-xs bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
          >
            Proceder al pago
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaConfirmacion;
