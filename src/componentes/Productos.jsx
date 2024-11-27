import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const config = { headers: { Authorization: sessionStorage.getItem('token') } };

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoStock, setNuevoStock] = useState({});
  const [editingProducto, setEditingProducto] = useState(null);

  const obtenerDatos = () => {
    axios.get('http://localhost:3000/api/rutasPublic/ver/producto', config)
      .then((response) => {
        setProductos(response.data.productos);
      })
      .catch((error) => {
        console.error('Hubo un problema al obtener los productos:', error);
      });
  };

  const eliminarProducto = (id) => {
    axios.delete(`http://localhost:3000/api/rutasAdmin/eliminar/producto/${id}`, config)
      .then(() => {
        obtenerDatos();
        alert('Producto eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Hubo un problema al eliminar el producto:', error);
      });
  };

  const guardarEdicion = (idProducto) => {
    const talles = nuevoStock[idProducto];
  
    for (let idTalle in talles) {
      axios.put(
        `http://localhost:3000/api/rutasAdmin/actualizar/stock/${idTalle}`,{ stock: talles[idTalle] },config
      )
        .then(() => {
          obtenerDatos();
        })
        .catch((error) => {
          console.error('Hubo un problema al actualizar el stock del talle:', error);
        });
    }
    setEditingProducto(null);
    alert('Stock actualizado exitosamente');
  };
  

  useEffect(() => {
    obtenerDatos();
  }, []);

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
                <th className="py-2 px-4 border-b">Talles y Stock</th>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{producto.nombre}</td>
                  <td className="py-2 px-4 border-b">{producto.precio}</td>
                  <td className="py-2 px-4 border-b">
                    {producto.talles.map((talle) => (
                      <div key={talle.id} className="flex items-center space-x-2">
                        {editingProducto === producto.id ? (
                          <input
                            type="number"
                            value={
                              nuevoStock[producto.id]?.[talle.id] !== undefined
                                ? nuevoStock[producto.id][talle.id]
                                : talle.stock
                            }
                            onChange={(e) =>
                              setNuevoStock({
                                ...nuevoStock,
                                [producto.id]: {
                                  ...nuevoStock[producto.id],
                                  [talle.id]: parseInt(e.target.value, 10),
                                },
                              })
                            }
                            className="border px-2 py-1 rounded w-24"
                          />
                        ) : (
                          <span>
                            {talle.talle}: {talle.stock}
                          </span>
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={producto.ruta_imagen}
                      alt={producto.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingProducto === producto.id ? (
                      <>
                        <button
                          onClick={() => guardarEdicion(producto.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingProducto(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingProducto(producto.id)}
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
