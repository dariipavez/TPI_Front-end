// Boton.jsx
import React from 'react';
import './Boton.css'; // Asegúrate de tener un archivo de estilos para personalizar el botón.

const Boton = ({ texto, onClick }) => {
  return (
    <button className="boton" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;