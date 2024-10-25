import React from 'react';
import './Boton.css';

const Boton = ({ children, onClick, tipo = 'button' }) => {
  return (
    <button className="boton" type={tipo} onClick={onClick}>
      {children}
    </button>
  );
};

export default Boton;
