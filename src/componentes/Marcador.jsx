// Marcador.jsx
import React from 'react';
import './Marcador.css'; // Asegúrate de tener un archivo de estilos para personalizar el marcador.

const Marcador = () => {
  // Ejemplo de tallas disponibles, puedes modificar o adaptar según necesites.
  const tallas = ['S', 'M', 'L', 'XL'];

  return (
    <div className="marcador">
      {tallas.map((talla, index) => (
        <span key={index} className="marcador-item">
          {talla}
        </span>
      ))}
    </div>
  );
};

export default Marcador;
