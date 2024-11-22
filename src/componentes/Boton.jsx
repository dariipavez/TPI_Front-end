import React from 'react';

const Boton = ({ texto, onClick }) => {
  return (
    <button 
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Boton;
