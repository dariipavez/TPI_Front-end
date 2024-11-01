import React from 'react';
import Boton from './Boton';
import Marcador from './Marcador';
import './Tarjetadetalle.css';

const TarjetaDetalle = () => {
  return (
    <div className="tarjeta-detalle">
      <div className="detalle-imagen">
        {/* Aquí iría la imagen del producto */}
        <img src="ruta_de_la_imagen_del_producto" alt="Producto" />
      </div>
      <div className="detalle-info">
        <h2>Nombre del Producto</h2>
        <p>Descripción del producto...</p>
        <p>Precio: $XX.XXX</p>

        {/* Componente Marcador */}
        <Marcador />

        {/* Componente Botón */}
        <Boton texto="Agregar al carrito" />
      </div>
    </div>
  );
};

export default TarjetaDetalle;
