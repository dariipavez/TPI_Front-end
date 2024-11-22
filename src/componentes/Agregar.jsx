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
    stock: '',
  });
  const [imagen, setImagen] = useState(null);
  const [talles, setTalles] = useState([]);
  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);
  const [tallesFiltrados, setTallesFiltrados] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    const config = {
      headers: { Authorization: token }
    };

    axios.get('http://localhost:3000/api/rutasPublic/ver/talle', config)
      .then(respuesta => {
        setTalles(respuesta.data.talles);
      })
      .catch(error => {
        console.error('Error al obtener los talles:', error);
      });

    axios.get('http://localhost:3000/api/rutasPublic/ver/marca', config)
      .then(respuesta => {
        setMarcas(respuesta.data.marca);
      })
      .catch(error => {
        console.error('Error al obtener las marcas:', error);
      });

    axios.get('http://localhost:3000/api/rutasPublic/ver/tipo_producto', config)
      .then(respuesta => {
        setTiposProducto(respuesta.data.tipo_producto);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de producto:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.id_tipo_producto) {
      const tallesFiltrados = talles.filter(talle => talle.id_tipo_producto === parseInt(formData.id_tipo_producto));
      setTallesFiltrados(tallesFiltrados);
    } else {
      setTallesFiltrados([]);
    }
  }, [formData.id_tipo_producto, talles]);

  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const manejarSoltarImagen = (evento) => {
    evento.preventDefault();
    const archivo = evento.dataTransfer.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(archivo);
    }
  };

  const manejarArrastreSobre = (evento) => {
    evento.preventDefault();
  };

  const manejarSeleccionTalle = (talle) => {
    setTallesSeleccionados((prevTalles) =>
      prevTalles.includes(talle) ? prevTalles.filter((t) => t !== talle) : [...prevTalles, talle]
    );
  };

  const manejarEnvioFormulario = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    const config = {
      headers: { Authorization: token }
    };

    const formDataEnviar = new FormData();
    for (const key in formData) {
      formDataEnviar.append(key, formData[key]);
    }
    formDataEnviar.append('imagen', imagen);
    formDataEnviar.append('talles', JSON.stringify(tallesSeleccionados));

    axios.post('http://localhost:3000/api/rutasAdmin/registrar/producto', formDataEnviar, config)
      .then(respuesta => {
        alert('Producto registrado correctamente.');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al registrar el producto:', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Añadir Nuevo Ingreso</h2>
          <form className="space-y-6" onSubmit={manejarEnvioFormulario}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="zona-soltar-foto border-2 border-dashed border-gray-400 p-6 flex items-center justify-center" 
                onDrop={manejarSoltarImagen} 
                onDragOver={manejarArrastreSobre}
              >
                {imagen ? (
                  <img src={URL.createObjectURL(imagen)} alt="Vista previa" className="h-48 w-full object-cover" />
                ) : (
                  <p>Arrastra y suelta la foto aquí</p>
                )}
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700">Precio</label>
                  <input type="text" name="precio" value={formData.precio} onChange={manejarCambio} placeholder="$" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre del Modelo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={manejarCambio} placeholder="Nombre del modelo" className="w-full p-2 border border-gray-300 rounded" />
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
                <div className="mb-4">
                  <label className="block text-gray-700">Stock</label>
                  <input type="text" name="stock" value={formData.stock} onChange={manejarCambio} placeholder="Cantidad en stock" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Talles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {tallesFiltrados.map((talle) => (
                  <button 
                    type="button" 
                    key={talle.id} 
                    className={`p-2 border rounded ${tallesSeleccionados.includes(talle.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => manejarSeleccionTalle(talle.id)}
                  >
                    {talle.talle}
                  </button>
                ))}
              </div>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
              Añadir Nuevo Ingreso
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;
