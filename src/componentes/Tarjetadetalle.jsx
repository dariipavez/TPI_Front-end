// src/components/TarjetaDetalle.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import './TarjetaDetalle.css';

const TarjetaDetalle = () => {
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const precioUnitario = 65000; // Puedes ajustar el precio según el producto
  const total = precioUnitario * cantidad;

  const manejarSeleccionDeTalle = (talle) => {
    setTalleSeleccionado(talle);
  };

  const manejarCambioDeCantidad = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="tarjeta-pagina">
      <Navbar />

      <div className="tarjeta">
        <div className="tarjeta-detalle">
          <div className="tarjeta-detalle-fotos">

            <div className="foto">FOTO</div>
            <div className="foto">FOTO</div>
            <div className="foto">FOTO</div>
            <div className="foto">FOTO</div>

            {producto.imagenes.map((imagen, index) => (
              <img 
                key={index}
                src={`http://localhost:3000/uploads/${imagen.split('\\').pop()}`} 
                alt={producto.nombre} 
                className="foto"
              />
            ))}

          </div>

          <div className="tarjeta-detalle-info">
            <h2>Nombre del Producto</h2>
            <p className="precio">${precioUnitario}</p>
            <p className="talle">TALLE</p>
            <div className="talles">
              {['S', 'M', 'L', 'XL', 'XXL'].map((talle) => (
                <span
                  key={talle}
                  className={`talle-opcion ${talleSeleccionado === talle ? 'seleccionado' : ''}`}
                  onClick={() => manejarSeleccionDeTalle(talle)}
                >
                  {talle}
                </span>
              ))}
            </div>

            <div className="selector-cantidad">
              <button onClick={() => manejarCambioDeCantidad('decrementar')}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => manejarCambioDeCantidad('incrementar')}>+</button>
            </div>
            <div className="tarjeta-precio">
              <p>Precio: ${precioUnitario}</p>
              <p>Total: ${total}</p>
            </div>

            <Boton texto="Agregar al carrito" onClick={() => console.log('Producto agregado')} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaDetalle;