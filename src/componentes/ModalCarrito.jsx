import React, { useEffect } from 'react';

const ModalCarrito = ({ isOpen, onClose, carrito, eliminarProducto, navegar }) => {
  const precioTotalCarrito = carrito.reduce((total, producto) => total + (producto.precio_unitario * producto.cantidad), 0);

  useEffect(() => {
    sessionStorage.setItem('precio_total', precioTotalCarrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
  }, [precioTotalCarrito, carrito]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={onClose}>
            X
          </button>
          <h2 className="text-xl font-bold mb-4 text-white text-center">Carro de compras</h2>
          {carrito.length === 0 ? (
            <p className="text-center text-white">El carrito está vacío</p>
          ) : (
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {carrito.map((producto, index) => (
                <div key={index} className="flex items-center bg-gray-800 p-4 rounded-lg">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-grow text-white">
                    <h3 className="font-bold">{producto.nombre}</h3>
                    <p>Talle: {producto.talle}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${producto.precio_unitario}</p>
                    <p>Precio total: ${producto.precio_unitario * producto.cantidad}</p>
                  </div>
                  <button
                    className="ml-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => eliminarProducto(producto.id, producto.talle)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 text-white text-center">
            <h3 className="font-bold">Total del carrito: ${precioTotalCarrito}</h3>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => navegar('/confirmacion')}
          >
            Continuar compra
          </button>
        </div>
      </div>
    )
  );
};

export default ModalCarrito;
