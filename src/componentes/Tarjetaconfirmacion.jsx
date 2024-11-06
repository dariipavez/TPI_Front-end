import React, { useState } from 'react';
import './Tarjetaconfirmacion.css';

const Tarjetaconfirmacion = () => {
  const [cantidad, setCantidad] = useState(1);
  const precioIndividual = 65000;

  const total = precioIndividual * cantidad;

  const handleCantidadChange = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="tarjetaconfirmacion">
      <img src="/zapatillas puma suede xl.webp" alt="Puma Suede XL" className="tarjeta-imagen" />
      <div className="tarjeta-detalle">
        <h3>Puma Suede XL</h3>
        <div className="selector-cantidad">
          <button onClick={() => handleCantidadChange('decrementar')}>-</button>
          <span>{cantidad}</span>
          <button onClick={() => handleCantidadChange('incrementar')}>+</button>
        </div>
        <div className="tarjeta-precio">
          <p>Precio: ${precioIndividual}</p>
          <p>Total: ${total}</p>
        </div>
        {/* Aquí está el botón "Proceder al pago" */}
        <div className="boton-proceder">
          <button onClick={() => alert("Proceder al pago")}>Proceder al pago</button>
        </div>
      </div>
    </div>
  );
};

export default Tarjetaconfirmacion;
