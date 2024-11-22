import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from "wouter";
import './Tarjetaproductos.css'; 

const RopaDeportiva = () => {
  const [productos, setProductos] = useState([]);
  const idCategoria = 2; // Asigna el ID de categoría correspondiente a "deportiva"

  useEffect(() => {
    const obtenerProductosFiltrados = () => {
      const url = `http://localhost:3000/api/rutasPublic/ver/producto/categoria/${idCategoria}`;
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

    obtenerProductosFiltrados();
  }, [idCategoria]); // Asegúrate de incluir idCategoria en las dependencias del useEffect

  const renderContent = () => {
    return productos.length > 0 ? (
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
    ) : (
      <p>No se encontraron productos en esta categoría.</p>
    );
  };

  return (
    <div>
      <Navbar />
      <h1>Ropa Deportiva</h1>
      {renderContent()}
      <Footer />
    </div>
  );
};

export default RopaDeportiva;
