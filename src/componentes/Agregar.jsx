import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
const Agregar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    id_marca: '',
    id_tipo_producto: '',
    precio: '',
  });
  const [imagen, setImagen] = useState(null);
  const [talles, setTalles] = useState([]);
  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
  const [stocksSeleccionados, setStocksSeleccionados] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    const config = { headers: { Authorization: token } };

    const verMarcasYProductos = () => {
      axios.get('http://localhost:3000/api/rutasPublic/ver/marca', config)
        .then(res => {
          setMarcas(res.data.marca);
        })
        .catch(err => {
          console.error('Error al obtener las marcas:', err);
        });

      axios.get('http://localhost:3000/api/rutasPublic/ver/tipo_producto', config)
        .then(res => {
          setTiposProducto(res.data.tipo_producto);
        })
        .catch(err => {
          console.error('Error al obtener los tipos de producto:', err);
        });
    };

    const verTalles = () => {
      if (formData.id_tipo_producto) {
        axios.get(`http://localhost:3000/api/rutasPublic/ver/talle/tipo_producto/${formData.id_tipo_producto}`, config)
          .then(res => {
            console.log('Respuesta de la API:', res.data);
            setTalles(res.data.talles);
          })
          .catch(err => {
            console.error('Error al obtener los talles:', err);
          });
      }
    };

    verMarcasYProductos();
    verTalles();
  }, [formData.id_tipo_producto]);

  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const manejarImagen = (evento) => {
    evento.preventDefault();
    const archivo = evento.dataTransfer ? evento.dataTransfer.files[0] : evento.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(archivo);
    }
  };

  const manejarSeleccionTalle = (talle) => {
    setTallesSeleccionados((prevTalles) =>
      prevTalles.includes(talle) ? prevTalles.filter((t) => t !== talle) : [...prevTalles, talle]
    );
  };

  const manejarCambioStock = (talleId, stock) => {
    setStocksSeleccionados((prevStocks) => ({
      ...prevStocks,
      [talleId]: stock,
    }));
  };

  const manejarEnvioFormulario = (e) => {
    e.preventDefault();

    if (talles.length === 0) {
      alert('Debe seleccionar al menos un talle.');
      return;
    }

    const tallesNoSeleccionados = talles.filter(talle => !tallesSeleccionados.includes(talle.id));
    if (tallesNoSeleccionados.length > 0) {
      alert('Debe seleccionar todos los talles.');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    const config = { headers: { Authorization: token } };

    const formDataEnviar = new FormData();
    for (const key in formData) {
      formDataEnviar.append(key, formData[key]);
    }
    formDataEnviar.append('imagen', imagen);

    axios.post('http://localhost:3000/api/rutasAdmin/registrar/producto', formDataEnviar, config)
      .then((res) => {
        const id_producto = res.data.id_producto;

        const datosTalles = {
          id_producto,
          talles: JSON.stringify(tallesSeleccionados),
          stock: JSON.stringify(tallesSeleccionados.map(talle => stocksSeleccionados[talle] || 0))
        };

        return axios.post('http://localhost:3000/api/rutasAdmin/registrar/producto_talle', datosTalles, config);
      })
      .then(() => {
        alert('Producto registrado correctamente con talles.');
        window.location.reload();
      })
      .catch(err => {
        console.error('Error al registrar el producto o los talles:', err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Añadir Nuevo Producto</h2>
          <form className="space-y-6" onSubmit={manejarEnvioFormulario}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="zona-soltar-foto border-2 border-dashed border-gray-400 p-6 flex items-center justify-center" 
                onDrop={manejarImagen} 
                onDragOver={(e) => e.preventDefault()}
              >
                {imagen ? (
                  <img src={URL.createObjectURL(imagen)} alt="Vista previa" className="h-48 w-full object-cover" />
                ) : (
                  <div>
                    <input type="file" onChange={manejarImagen} className="hidden" id="upload-input" />
                    <label htmlFor="upload-input" className="cursor-pointer">Arrastra y suelta la foto aquí</label>
                  </div>
                )}
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700">Precio</label>
                  <input type="text" name="precio" value={formData.precio} onChange={manejarCambio} placeholder="$" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre del Producto</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={manejarCambio} placeholder="Nombre del producto" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Marca</label>
                  <select name="id_marca" value={formData.id_marca} onChange={manejarCambio} className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Seleccione una marca</option>
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tipo de Producto</label>
                  <select name="id_tipo_producto" value={formData.id_tipo_producto} onChange={manejarCambio} className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Seleccione un tipo de producto</option>
                    {tiposProducto.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Talles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {talles.map((talle) => (
                  <div key={talle.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`talle-${talle.id}`}
                      checked={tallesSeleccionados.includes(talle.id)}
                      onChange={() => manejarSeleccionTalle(talle.id)}
                    />
                    <label htmlFor={`talle-${talle.id}`} className="ml-2">{talle.talle}</label>
                    {tallesSeleccionados.includes(talle.id) && (
                      <input
                        type="number"
                        min="0"
                        value={stocksSeleccionados[talle.id] || 0}
                        onChange={(e) => manejarCambioStock(talle.id, e.target.value)}
                        placeholder="Stock"
                        className="ml-2 p-1 w-16 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">Registrar Producto</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;
