import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Boton from './Boton';
import './TarjetaDetalle.css';

const TarjetaDetalle = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const [talles, setTalles] = useState([]);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/rutasPublic/ver/producto/${id}`)
      .then(respuestaProducto => {
        const producto = respuestaProducto.data.producto;
        setProducto(producto);
        return axios.get(`http://localhost:3000/api/rutasPublic/ver/talle/tipo_producto/${producto.id_tipo_producto}`);
      })
      .then(respuestaTalles => setTalles(respuestaTalles.data.talles))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, [id]);

  const manejarSeleccionDeTalle = (talle) => {
    const talleDisponible = talles.find(t => t.talle === talle);
    if (!talleDisponible || producto.stock <= 0) {
      alert(`El producto no está disponible en el talle seleccionado (${talle}).`);
      return;
    }
    setTalleSeleccionado(talle);
  };

  const manejarCambioDeCantidad = (operacion) => {
    setCantidad(prevCantidad => operacion === 'incrementar' ? prevCantidad + 1 : Math.max(prevCantidad - 1, 1));
  };

  const agregarAlCarrito = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
      return;
    }

    if (!talleSeleccionado) {
      alert('Por favor, selecciona un talle.');
      return;
    }

    const usuarioId = sessionStorage.getItem('usuario_id');
    const tallaSeleccionada = talles.find(t => t.talle === talleSeleccionado && t.id === producto.id_talle);
    if (!tallaSeleccionada) {
      alert('El talle seleccionado no está disponible.');
      return;
    }

    if (producto.stock <= 0) {
      alert('El producto no tiene stock.');
      return;
    }

    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.ruta_imagen,
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

  return (
    <div className="tarjeta-pagina">
      <Navbar />
      {!producto || talles.length === 0 ? (
        <div>Cargando...</div>
      ) : (
        <div className="tarjeta">
          <div className="tarjeta-detalle">
            <div className="tarjeta-detalle-fotos">
              <img src={producto.ruta_imagen} alt={producto.nombre} className="foto" />
            </div>
            <div className="tarjeta-detalle-info">
              <h2>{producto.nombre}</h2>
              <p className="precio">${producto.precio}</p>
              <p className="talle">TALLE</p>
              <div className="talles">
                {talles.map(talle => (
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
                <p>Total: ${producto.precio * cantidad}</p>
              </div>
              <Boton texto="Agregar al carrito" onClick={agregarAlCarrito} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TarjetaDetalle;
