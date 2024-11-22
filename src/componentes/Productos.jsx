import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState(null);
  const [edicionActiva, setEdicionActiva] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);
  const [talles, setTalles] = useState([]);

  const obtenerDatos = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }
    const config = {
      headers: {
        Authorization: token
      }
    };

    axios.get('http://localhost:3000/api/rutasPublic/ver/producto', config)
      .then((response) => {
        setProductos(response.data.productos);
      })
      .catch((error) => {
        console.error('Hubo un problema al obtener los productos:', error);
      });

    axios.get('http://localhost:3000/api/rutasPublic/ver/marca', config)
      .then((response) => {
        setMarcas(response.data.marca);
      })
      .catch((error) => {
        console.error('Hubo un problema al obtener las marcas:', error);
      });

    axios.get('http://localhost:3000/api/rutasPublic/ver/tipo_producto', config)
      .then((response) => {
        setTiposProducto(response.data.tipo_producto);
      })
      .catch((error) => {
        console.error('Hubo un problema al obtener los tipos de producto:', error);
      });

    axios.get('http://localhost:3000/api/rutasPublic/ver/talle', config)
      .then((response) => {
        setTalles(response.data.talles);
      })
      .catch((error) => {
        console.error('Hubo un problema al obtener los talles:', error);
      });
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const manejarActualizacionProducto = (e) => {
    e.preventDefault();

    if (!productoActual) return;

    const datosActualizados = new FormData();
    datosActualizados.append('nombre', productoActual.nombre);
    datosActualizados.append('precio', productoActual.precio);
    datosActualizados.append('stock', productoActual.stock);
    datosActualizados.append('id_tipo_producto', productoActual.id_tipo_producto);
    datosActualizados.append('id_marca', productoActual.id_marca);
    datosActualizados.append('id_talle', productoActual.id_talle);

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    console.log('Token utilizado para actualizar producto:', token);

    axios.put(`http://localhost:3000/api/rutasAdmin/actualizar/producto/${productoActual.id}`, datosActualizados, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      obtenerDatos(); 
      setProductoActual(null);
      setEdicionActiva(null);
      alert('Producto actualizado exitosamente');
    })
    .catch((error) => {
      console.error('Hubo un problema al actualizar el producto:', error);
    });
  };

  const eliminarProducto = (id) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    console.log('Token utilizado para eliminar producto:', token);

    axios.delete(`http://localhost:3000/api/rutasAdmin/eliminar/producto/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      obtenerDatos();
      alert('Producto eliminado exitosamente');
    })
    .catch((error) => {
      console.error('Hubo un problema al eliminar el producto:', error);
    });
  };

  const manejarSeleccionProducto = (producto) => {
    setProductoActual(producto);
    setEdicionActiva(producto.id);
  };

  const manejarCambio = (e, campo) => {
    setProductoActual({ ...productoActual, [campo]: e.target.value });
  };

  const obtenerNombreMarca = (id) => {
    const marca = marcas.find(marca => marca.id === id);
    return marca ? marca.nombre : '';
  };

  const obtenerNombreTipoProducto = (id) => {
    const tipo = tiposProducto.find(tipo => tipo.id === id);
    return tipo ? tipo.nombre : '';
  };

  const obtenerNombreTalle = (id) => {
    const talle = talles.find(talle => talle.id === id);
    return talle ? talle.talle : '';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Tipo de Producto</th>
                <th className="py-2 px-4 border-b">Marca</th>
                <th className="py-2 px-4 border-b">Talle</th>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {edicionActiva === producto.id ? (
                      <input
                        type="text"
                        value={productoActual.nombre}
                        onChange={(e) => manejarCambio(e, 'nombre')}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      producto.nombre
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {edicionActiva === producto.id ? (
                      <input
                        type="number"
                        value={productoActual.precio}
                        onChange={(e) => manejarCambio(e, 'precio')}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      producto.precio
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {edicionActiva === producto.id ? (
                      <input
                        type="number"
                        value={productoActual.stock}
                        onChange={(e) => manejarCambio(e, 'stock')}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      producto.stock
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {obtenerNombreTipoProducto(producto.id_tipo_producto)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {obtenerNombreMarca(producto.id_marca)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {obtenerNombreTalle(producto.id_talle)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img src={producto.ruta_imagen} alt={producto.nombre} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    {edicionActiva === producto.id ? (
                      <>
                        <button
                          onClick={manejarActualizacionProducto}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEdicionActiva(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => manejarSeleccionProducto(producto)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Productos;