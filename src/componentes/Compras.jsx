import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Compras.css';

const Compras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    const comprasGuardadas = JSON.parse(localStorage.getItem(`compras_${usuarioId}`)) || [];
    setCompras(comprasGuardadas);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="compras-contenedor">
        <h1>Mis Compras</h1>
        {compras.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          compras.map((compra, index) => (
            <div key={index} className="compra">
              <h3>Compra #{index + 1}</h3>
              <p>Correo: {compra.email}</p>
              <p>Nombre: {compra.nombres} {compra.apellidos}</p>
              <p>DNI: {compra.dni}</p>
              <p>Teléfono: {compra.telefono}</p>
              <p>Calle: {compra.calle} {compra.numero}</p>
              <p>Código Postal: {compra.codigoPostal}</p>
              <p>Ciudad: {compra.ciudad}</p>
              <p>Destinatario: {compra.destinatario}</p>
              <p>Método de Entrega: {compra.metodoEntrega}</p>
              <p>Método de Pago: {compra.metodoPago}</p>
              <h4>Productos:</h4>
              <ul>
                {compra.carrito.map((producto, idx) => (
                  <li key={idx}>
                    {producto.nombre} - {producto.talle} - {producto.cantidad} unidades - ${producto.precio}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Compras;
