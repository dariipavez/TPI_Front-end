// TarjetaProductos.jsx
import React from 'react';
import './Tarjetaproductos.css'; // Mantenemos el mismo archivo CSS

const TarjetaProductos = () => {
  const productos = [
    { 
      nombre: 'Buzo Essentials con Capucha', 
      precio: '$40.000', 
      imagen: 'buzo essentials marron.webp' 
    },
    { 
      nombre: 'Remera Bomy Club Oversize', 
      precio: '$15.000', 
      imagen: 'remera_bomy_club-removebg-preview.png' 
    },
    { 
      nombre: 'Pantalón Frandor Mom', 
      precio: '$30.000', 
      imagen: 'pantalon_mom-removebg-preview.png' 
    },
    { 
      nombre: 'Zapatillas Puma Suede XL', 
      precio: '$25.000', 
      imagen: 'zapatillas puma suede xl.webp' 
    },
    { 
      nombre: 'Buzo Retro AFA 2006', 
      precio: '$22.000', 
      imagen: 'buzo_retro_afa_2006-removebg-preview.png' 
    },
    { 
      nombre: 'Camiseta Retro Francia 2006', 
      precio: '$22.000', 
      imagen: 'francia_2006-removebg-preview.png' 
    },
    { 
      nombre: 'Pantalón River Plate 2024', 
      precio: '$24.000', 
      imagen: 'pantalon_river_actual-removebg-preview.png' 
    },
    { 
      nombre: 'Short Selección Argentina', 
      precio: '$15.000', 
      imagen: 'short seleccion argentina.jpg' 
    },
  ];

  return (
    <div className="menu-productos">
      {productos.map((producto, index) => (
        <div key={index} className="tarjeta-producto">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="tarjeta-producto-imagen" 
          />
          <h3 className="tarjeta-producto-nombre">{producto.nombre}</h3>
          <p className="tarjeta-producto-precio">{producto.precio}</p>
          <button className="boton-carrito">🛒</button>
        </div>
      ))}
    </div>
  );
};

export default TarjetaProductos;

