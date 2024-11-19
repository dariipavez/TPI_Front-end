import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tarjetaproductos.css'; 
import { Link } from "wouter";

const TarjetaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = () => {
      const url = "http://localhost:3000/api/rutasPublic/ver/producto";
      axios.get(url)
        .then((resp) => {
          if (resp.data.productos) {
            setProductos(resp.data.productos);
          } else {
            console.error('No se encontraron datos de productos.');
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos de los productos:', error);
        });
    };

    obtenerProductos();
  }, []);

  return (
    <div className="menu-productos">
      {productos.map(producto => (
        <Link key={producto.id} href={`/detalle/${producto.id}`} className="tarjeta-producto-link">
          <div className="tarjeta-producto">
            <img 
              src={producto.ruta_imagen}
              alt={producto.nombre}
              className="tarjeta-producto-imagen"
            />
            <h3 className="tarjeta-producto-nombre">{producto.nombre}</h3>
            <p className="tarjeta-producto-precio">${producto.precio}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TarjetaProductos;
