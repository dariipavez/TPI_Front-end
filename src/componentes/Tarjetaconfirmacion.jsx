// src/components/TarjetaConfirmacion.jsx
import React from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';
import './TarjetaConfirmacion.css';

const TarjetaConfirmacion = () => {
  const [, setUbicacion] = useLocation();  // Cambiado para reflejar el contexto en español

  const manejarProcederAlPago = () => {
    setUbicacion('/Info');  // Redirige a la página de TarjetaInfo
  };

  return (
    <div className="tarjeta-confirmacion-pagina">
      <Navbar />

      <div className="tarjeta-confirmacion-contenido">
        <div className="tarjeta-confirmacion">
          <img src="/zapatillas puma suede xl.webp" alt="Puma Suede XL" className="tarjeta-imagen" />
          <div className="tarjeta-detalle">
            <h3>Puma Suede XL</h3>
            {/* Botón "Proceder al pago" */}
            <div className="boton-proceder">
              <button onClick={manejarProcederAlPago}>Proceder al pago</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaConfirmacion;