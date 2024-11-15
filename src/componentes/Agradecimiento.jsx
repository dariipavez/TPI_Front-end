import React from 'react';
import { useLocation } from 'wouter';
import './Agradecimiento.css';

const Agradecimiento = () => {
  const [, navegar] = useLocation(); // Hook de navegación

  const volverAlMenu = () => {
    navegar('/'); // Redirige a la pantalla de menú
  };

  return (
    <div className="contenedor-agradecimiento">
      <div className="caja-agradecimiento">
        <h2>¡Muchas gracias por tu compra en MDT!</h2>
        <p>A continuación, te enviaremos un correo electrónico con tu número de envío y la factura de tu compra.</p>
        {/* Botón para volver al menú */}
        <button className="boton-volver-menu" onClick={volverAlMenu}>
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default Agradecimiento;