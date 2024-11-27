import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Compras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    const comprasGuardadas = JSON.parse(localStorage.getItem(`compras_${usuarioId}`)) || [];
    setCompras(comprasGuardadas);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Mis Compras</h1>
        {compras.length === 0 ? (
          <p className="text-center text-gray-700">No tienes compras registradas.</p>
        ) : (
          <div className="space-y-6">
            {compras.map((compra, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Compra #{index + 1}</h3>
                <p><span className="font-bold">Correo:</span> {compra.email}</p>
                <p><span className="font-bold">Nombre:</span> {compra.nombres}</p>
                <p><span className="font-bold">Teléfono:</span> {compra.telefono}</p>
                <p><span className="font-bold">Calle:</span> {compra.calle} {compra.numero}</p>
                <p><span className="font-bold">Código Postal:</span> {compra.codigo_postal}</p>
                <p><span className="font-bold">Ciudad:</span> {compra.ciudad}</p>
                <p><span className="font-bold">Información Adicional:</span> {compra.informacion_adicional}</p>
                <h4 className="font-bold mt-4">Productos:</h4>
                <ul className="list-disc list-inside">
                  {compra.carrito.map((producto, idx) => (
                    <li key={idx}>
                      {producto.nombre} - {producto.talle} - {producto.cantidad} unidades - ${producto.precio_unitario} - Total:${producto.total}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Compras;