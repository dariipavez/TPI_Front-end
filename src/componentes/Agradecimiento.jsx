import React from 'react';
import { useLocation } from 'wouter';

const Agradecimiento = () => {
  const [, navegar] = useLocation(); // Hook de navegación

  const volverAlMenu = () => {
    navegar('/'); // Redirige a la pantalla de menú
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-4">¡Muchas gracias por tu compra en MDT!</h2>
        <p className="text-gray-700 mb-6">
          A continuación, te enviaremos un correo electrónico con tu número de envío y la factura de tu compra.
        </p>
        {/* Botón para volver al menú */}
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={volverAlMenu}
        >
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default Agradecimiento;
