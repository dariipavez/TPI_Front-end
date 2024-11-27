import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from "wouter";

const PáginaPrincipal = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = () => {
      const url = 'http://localhost:3000/api/rutasPublic/ver/producto';
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

  const renderContent = () => {
    return productos.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productos.map(producto => (
          <Link key={producto.id} href={`/detalle/${producto.id}`} className="block group">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img 
                src={producto.ruta_imagen} 
                alt={producto.nombre}
                className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">{producto.nombre}</h3>
                <p className="text-gray-700">${producto.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-center mt-6 text-gray-700">No se encontraron productos.</p>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow p-6">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default PáginaPrincipal;