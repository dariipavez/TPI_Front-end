import React, { useState } from 'react';
import { useLocation } from 'wouter';  // Usamos el hook useLocation de wouter
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

  const [, setLocation] = useLocation();  // useLocation es ahora el adecuado para la redirección

  const handleProcederAlPago = () => {
    setLocation('/Info');  // Redirige a la página de TarjetaInfo
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
        {/* Botón "Proceder al pago" */}
        <div className="boton-proceder">
          <button onClick={handleProcederAlPago}>Proceder al pago</button>
        </div>
      </div>
    </div>
  );
};

export default Tarjetaconfirmacion;

