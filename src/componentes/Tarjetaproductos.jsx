import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "wouter";

const TarjetaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = () => {
      const url = `http://localhost:3000/api/rutasPublic/ver/producto`;
      axios.get(url)
        .then((resp) => {
          if (resp.data.productos) {
            const productosUnicos = resp.data.productos.reduce((acc, producto) => {
              if (!acc.find(p => p.id === producto.id)) {
                acc.push(producto);
              }
              return acc;
            }, []);
            setProductos(productosUnicos);
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
    <div className="menu-productos flex justify-center">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 max-w-screen-lg">
        {productos.map(producto => (
          <Link key={producto.id} href={`/detalle/${producto.id}`} className="tarjeta-producto-link no-underline">
            <div className="tarjeta-producto bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
              <img 
                src={producto.ruta_imagen}
                alt={producto.nombre}
                className="tarjeta-producto-imagen w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="tarjeta-producto-nombre text-xl font-bold mb-2 text-center">{producto.nombre}</h3>
                <p className="tarjeta-producto-precio text-gray-800 text-center text-lg">${producto.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TarjetaProductos;
