import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import { Link } from 'wouter';
import './TarjetaDetalle.css';

const TarjetaDetalle = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const [talles, setTalles] = useState([]);
  const [talleSeleccionado, setTalleSeleccionado] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const urlProducto = `http://localhost:3000/api/rutasPublic/ver/producto/${id}`;
    axios.get(urlProducto)
      .then(respProducto => {
        if (respProducto.data.producto) {
          setProducto(respProducto.data.producto);
          const urlTalles = `http://localhost:3000/api/rutasPublic/ver/talle/${respProducto.data.producto.id_tipo_producto}`;
          axios.get(urlTalles)
            .then(respTalles => {
              if (respTalles.data.talles) {
                setTalles(respTalles.data.talles);
              }
            })
            .catch(error => {
              console.error('Error al obtener los datos de los talles:', error);
            });
        } else {
          console.error('No se encontraron datos del producto.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del producto:', error);
      });
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const manejarSeleccionDeTalle = (talle) => {
    setTalleSeleccionado((prevTalles) => {
      if (prevTalles.includes(talle)) {
        return prevTalles.filter((t) => t !== talle);
      } else {
        return [...prevTalles, talle];
      }
    });
  };

  const manejarCambioDeCantidad = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const total = producto.precio * cantidad;

  const agregarAlCarrito = () => {
    const urlCarrito = `http://localhost:3000/api/rutasPublic/carrito`;
    axios.post(urlCarrito, {
      usuario_id: 1, // Esto debería ser dinámico basado en el usuario actual
      producto_id: producto.id,
      cantidad,
      // Aquí puedes añadir más campos si es necesario, como talle
    })
      .then(() => {
        console.log('Producto agregado al carrito');
      })
      .catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
      });
  };

  return (
    <div className="tarjeta-pagina">
      <Navbar />

      <div className="tarjeta">
        <div className="tarjeta-detalle">
          <div className="tarjeta-detalle-fotos">
              <img 
                src={producto.ruta_imagen} 
                alt={producto.nombre} 
                className="foto"
              />
          </div>

          <div className="tarjeta-detalle-info">
            <h2>{producto.nombre}</h2>
            <p className="precio">${producto.precio}</p>
            <p className="talle">TALLE</p>
            <div className="talles">
              {talles.map((talle) => (
                <span
                  key={talle.id}
                  className={`talle-opcion ${talleSeleccionado.includes(talle.talle) ? 'seleccionado' : ''}`}
                  onClick={() => manejarSeleccionDeTalle(talle.talle)}
                >
                  {talle.talle}
                </span>
              ))}
            </div>

            <div className="selector-cantidad">
              <button onClick={() => manejarCambioDeCantidad('decrementar')}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => manejarCambioDeCantidad('incrementar')}>+</button>
            </div>
            <div className="tarjeta-precio">
              <p>Precio: ${producto.precio}</p>
              <p>Total: ${total}</p>
            </div>

            <Boton texto="Agregar al carrito" onClick={agregarAlCarrito} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TarjetaDetalle;
