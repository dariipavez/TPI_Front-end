import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Agregar.css';

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
    <div className="contenedor-agregar">
      <Navbar />
      <div className="contenido-agregar">
        <h2>Añadir Nuevo Ingreso</h2>
        <form className="formulario" onSubmit={manejarEnvioFormulario}>
          <div className="lado-izquierdo">
            <div 
              className="zona-soltar-foto" 
              onDrop={manejarSoltarImagen} 
              onDragOver={manejarArrastreSobre}
            >
              {imagen ? (
                <img src={URL.createObjectURL(imagen)} alt="Vista previa" className="imagen-preview" />
              ) : (
                <p>Arrastra y suelta la foto aquí</p>
              )}
            </div>
            <div className="tallas">
              <h3>Talles</h3>
              <div className="opciones-talles">
                {tallesFiltrados.map((talle) => (
                  <button 
                    type="button" 
                    key={talle.id} 
                    className={tallesSeleccionados.includes(talle.id) ? 'seleccionado' : ''}
                    onClick={() => manejarSeleccionTalle(talle.id)}
                  >
                    {talle.talle}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lado-derecho">
            <div className="precio">
              <h3>Precio</h3>
              <input type="text" name="precio" value={formData.precio} onChange={manejarCambio} placeholder="$" />
            </div>
            <div className="nombre-modelo">
              <h3>Nombre del Modelo</h3>
              <input type="text" name="nombre" value={formData.nombre} onChange={manejarCambio} placeholder="Nombre del modelo" />
            </div>
            <div className="marca">
              <h3>Marca</h3>
              <select name="id_marca" value={formData.id_marca} onChange={manejarCambio}>
                <option value="">Seleccione una marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                ))}
              </select>
            </div>
            <div className="tipo-producto">
              <h3>Tipo de Producto</h3>
              <select name="id_tipo_producto" value={formData.id_tipo_producto} onChange={manejarCambio}>
                <option value="">Seleccione un tipo de producto</option>
                {tiposProducto.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
            <div className="stock">
              <h3>Stock</h3>
              <input type="text" name="stock" value={formData.stock} onChange={manejarCambio} placeholder="Cantidad en stock" />
            </div>
            <button className="boton-anadir" type="submit">Añadir Nuevo Ingreso</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;
