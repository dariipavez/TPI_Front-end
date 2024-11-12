// Tarjetadetalle.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import './Tarjetadetalle.css';

const Tarjetadetalle = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="tarjeta-pagina">
      <Navbar /> {/* Navbar al inicio */}

    <div className="tarjeta">
      <div className="tarjeta-detalle">
        <div className="tarjeta-detalle-fotos">
          <div className="foto">FOTO</div>
          <div className="foto">FOTO</div>
          <div className="foto">FOTO</div>
          <div className="foto">FOTO</div>
        </div>

        <div className="tarjeta-detalle-info">
          <h2>Nombre del Producto</h2>
          <p className="precio">$$$</p>
          <p className="talle">TALLE</p>
          <div className="talles">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <span
                key={size}
                className={`talle-opcion ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </span>
            ))}
          </div>
          <Boton texto="Agregar al carrito" onClick={() => console.log('Producto agregado')} />
        </div>
      </div>
      </div>
      <Footer /> {/* Footer al final */}
    </div>
  );
};

export default Tarjetadetalle;
