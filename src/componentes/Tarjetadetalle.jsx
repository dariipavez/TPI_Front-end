import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import { Link } from 'wouter'; // Asegúrate de que esta importación se usa o elimina si no se necesita
import './TarjetaDetalle.css';

const TarjetaDetalle = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const [talles, setTalles] = useState([]);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null); // Cambiado a null en lugar de una matriz
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
    setTalleSeleccionado(talle);
  };

  const manejarCambioDeCantidad = (operacion) => {
    if (operacion === 'incrementar') {
      setCantidad(cantidad + 1);
    } else if (operacion === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
      return;
    }

    const usuarioId = sessionStorage.getItem('usuario_id');
    if (!talleSeleccionado) {
      alert('Por favor, selecciona un talle.');
      return;
    }

    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes[0], // Asumiendo que la primera imagen es la principal
      talle: talleSeleccionado,
      cantidad: cantidad,
    };

    const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
    const productoExistente = carrito.find(item => item.id === productoCarrito.id && item.talle === productoCarrito.talle);
    
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push(productoCarrito);
    }

    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  const total = producto.precio * cantidad;

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
                  className={`talle-opcion ${talleSeleccionado === talle.talle ? 'seleccionado' : ''}`}
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
