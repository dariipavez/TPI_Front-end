import React from 'react';
import './Tarjetaproductos.css';
import { Link } from "wouter";

const TarjetaProductos = ({ productos, busqueda }) => {
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="menu-productos">
      {productosFiltrados.map((producto) => (
        <div key={producto.id} className="tarjeta-producto">
          <Link href={`/detalle/${producto.id}`}>
            <img src={producto.imagen} alt={producto.nombre} className="tarjeta-producto-imagen" />
          </Link>
          <h3>{producto.nombre}</h3>
          <p>{producto.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default TarjetaProductos;
