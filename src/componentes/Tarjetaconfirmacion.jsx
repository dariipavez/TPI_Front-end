import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';
import './TarjetaConfirmacion.css';

const TarjetaConfirmacion = () => {
  const [cantidad, setCantidad] = useState(1);
  const precioIndividual = 65000;
  const total = precioIndividual * cantidad;
  const [, setLocation] = useLocation();

  const handleCantidadChange = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleProcederAlPago = () => {
    setLocation('/Info');
  };

  return (
    <div className="tarjeta-confirmacion-pagina">
      <Navbar />

      <div className="tarjeta-confirmacion-contenido">
        <div className="tarjeta-confirmacion">
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
            <div className="boton-proceder">
              <button onClick={handleProcederAlPago}>Proceder al pago</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaConfirmacion;