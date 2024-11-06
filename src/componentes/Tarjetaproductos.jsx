// TarjetaProductos.jsx
import React from 'react';
import './Tarjetaproductos.css'; 
import { Link } from "wouter";

const TarjetaProductos = ({ busqueda }) => {
  const productos = [
    { id: 1, nombre: 'Buzo Essentials con Capucha', precio: '$40.000', imagen: 'buzo essentials marron.webp' },
    { id: 2, nombre: 'Remera Bomy Club Oversize', precio: '$15.000', imagen: 'remera_bomy_club-removebg-preview.png' },
    { id: 3, nombre: 'Pantalón Frandor Mom', precio: '$30.000', imagen: 'pantalon_mom-removebg-preview.png' },
    { id: 4, nombre: 'Zapatillas Puma Suede XL', precio: '$65.000', imagen: 'zapatillas puma suede xl.webp' },
    { id: 5, nombre: 'Buzo Retro AFA 2006', precio: '$22.000', imagen: 'buzo_retro_afa_2006-removebg-preview.png' },
    { id: 6, nombre: 'Camiseta Retro Francia 2006', precio: '$22.000', imagen: 'francia_2006-removebg-preview.png' },
    { id: 7, nombre: 'Pantalón River Plate 2024', precio: '$24.000', imagen: 'pantalon_river_actual-removebg-preview.png' },
    { id: 8, nombre: 'Short Selección Argentina', precio: '$15.000', imagen: 'short seleccion argentina.jpg' },
  ];

  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="menu-productos">
      {filteredProducts.map((producto) => (
        <div key={producto.id} className="tarjeta-producto">
          <Link href={`/detalle/${producto.id}`}>
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="tarjeta-producto-imagen" 
            />
          </Link>
          <h3 className="tarjeta-producto-nombre">{producto.nombre}</h3>
          <p className="tarjeta-producto-precio">{producto.precio}</p>
          <button className="boton-carrito">🛒</button>
        </div>
      ))}
    </div>
  );
};

export default TarjetaProductos;
