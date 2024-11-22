import React, { useState, useEffect } from 'react';
import CarritoItem from './CarritoItem';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const obtenerCarrito = () => {
      const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(carritoLocal);
    };

    obtenerCarrito();
  }, []);

  const eliminarProd = (id, talle) => {
    const carritoActualizado = carrito.filter(producto => !(producto.id === id && producto.talle === talle));
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  };

  const setUnidCarrito = (id, unidades) => {
    const carritoActualizado = carrito.map(producto => {
      if (producto.id === id) {
        return { ...producto, cantidad: unidades };
      }
      return producto;
    });
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  };

  if (carrito.length === 0) {
    return <div>El carrito está vacío</div>;
  }

  return (
    <div className="carrito">
      {carrito.map(producto => (
        <CarritoItem
          key={`${producto.id}-${producto.talle}`}
          producto={producto}
          eliminarProd={eliminarProd}
          setUnidCarrito={setUnidCarrito}
        />
      ))}
    </div>
  );
};

export default Carrito;
