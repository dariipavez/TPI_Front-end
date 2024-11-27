import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const TarjetaDetalle = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/rutasPublic/ver/producto/${id}`)
      .then(respuestaProducto => {
        const producto = respuestaProducto.data.producto;
        setProducto(producto);
        setTalleSeleccionado(producto.talles[0]?.talle || null);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, [id]);

  const manejarSeleccionDeTalle = (talle) => {
    const talleDisponible = producto.talles.find(t => t.talle === talle);
    if (!talleDisponible) {
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
    const tallaSeleccionada = producto.talles.find(t => t.talle === talleSeleccionado);
    if (!tallaSeleccionada || tallaSeleccionada.stock <= 0) {
      alert('El talle seleccionado no está disponible o no tiene stock.');
      return;
    }
    const productoCarrito = {
      id_producto: producto.id,
      nombre: producto.nombre,
      precio_unitario: producto.precio,
      imagen: producto.ruta_imagen,
      talle: talleSeleccionado,
      id_talle: tallaSeleccionada.id,
      cantidad: cantidad,
      total: producto.precio * cantidad
    };
  
  
    const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
    const productoExistente = carrito.find(item => item.id_producto === productoCarrito.id_producto && item.talle === productoCarrito.talle);
  
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
      productoExistente.total += productoCarrito.total;
    } else {
      carrito.push(productoCarrito);
    }
  
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(carrito));
  
    const id_productos = carrito.map(producto => producto.id_producto);
    sessionStorage.setItem('id_productos', JSON.stringify(id_productos));
  

    const precioTotalCarrito = carrito.reduce((total, producto) => total + producto.total, 0);
    sessionStorage.setItem('precio_total', precioTotalCarrito);
  
    alert('Producto agregado al carrito');
    setCantidad(1);
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {!producto ? (
        <div className="flex-grow flex items-center justify-center text-lg">Cargando...</div>
      ) : (
        <div className="flex-grow flex justify-center items-center p-4">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img src={producto.ruta_imagen} alt={producto.nombre} className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-4">{producto.nombre}</h2>
              <p className="text-lg text-gray-700 mb-4">Precio: ${producto.precio}</p>
              <p className="text-lg font-semibold mb-2">TALLE</p>
              <div className="flex flex-wrap mb-4">
                {producto.talles.map(talle => (
                  <span
                    key={talle.id}
                    className={`cursor-pointer p-2 m-1 border rounded ${talleSeleccionado === talle.talle ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => manejarSeleccionDeTalle(talle.talle)}
                  >
                    {talle.talle}
                  </span>
                ))}
              </div>
              <div className="flex items-center mb-4">
                <button className="px-3 py-1 bg-gray-200 rounded-l" onClick={() => manejarCambioDeCantidad('decrementar')}>-</button>
                <span className="px-4 py-1 border-t border-b">{cantidad}</span>
                <button className="px-3 py-1 bg-gray-200 rounded-r" onClick={() => manejarCambioDeCantidad('incrementar')}>+</button>
              </div>
              <div className="text-lg font-semibold mb-4">
                <p>Precio unitario: ${producto.precio}</p>
                <p>Total: ${producto.precio * cantidad}</p>
              </div>
              <button
                onClick={agregarAlCarrito}
                className="w-auto bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TarjetaDetalle;
