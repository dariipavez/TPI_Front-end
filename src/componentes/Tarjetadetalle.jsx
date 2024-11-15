import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import './Tarjetadetalle.css';

const Tarjetadetalle = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const precioIndividual = 65000;  // Puedes ajustar el precio según el producto
  const total = precioIndividual * cantidad;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleCantidadChange = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
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
            <p className="precio">${precioIndividual}</p>
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
            
            <div className="selector-cantidad">
              <button onClick={() => handleCantidadChange('decrementar')}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => handleCantidadChange('incrementar')}>+</button>
            </div>
            <div className="tarjeta-precio">
              <p>Precio: ${precioIndividual}</p>
              <p>Total: ${total}</p>
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
