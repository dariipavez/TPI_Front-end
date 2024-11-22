import React from 'react';

const Marcador = () => {
  // Ejemplo de tallas disponibles, puedes modificar o adaptar según necesites.
  const tallas = ['S', 'M', 'L', 'XL'];

  return (
    <div className="flex space-x-2 p-4">
      {tallas.map((talla, index) => (
        <span key={index} className="bg-blue-600 text-white py-2 px-4 rounded">
          {talla}
        </span>
      ))}
    </div>
  );
};

export default Marcador;
