import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Agregar.css';

const Agregar = () => {
  const [imagen, setImagen] = useState(null);
  const [estiloSeleccionado, setEstiloSeleccionado] = useState("Urbana");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Buzo");
  
  const manejarSoltarImagen = (evento) => {
    evento.preventDefault();
    const archivo = evento.dataTransfer.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo));
    }
  };

  const manejarArrastreSobre = (evento) => {
    evento.preventDefault();
  };

  const manejarCambioEstilo = (evento) => {
    const nuevoEstilo = evento.target.value;
    setEstiloSeleccionado(nuevoEstilo);
    setTipoSeleccionado(opcionesTipoRopa[nuevoEstilo][0]); // Cambia automáticamente el tipo al primero de la lista
  };

  // Opciones de tipo de ropa según el estilo seleccionado
  const opcionesTipoRopa = {
    Urbana: ["Buzo", "Remera", "Pantalón", "Zapatillas"],
    Deportiva: ["Camiseta", "Buzo", "Short", "Medias"]
  };

  return (
    <div className="contenedor-agregar">
      <Navbar />
      <div className="contenido-agregar">
        <h2>Añadir Nuevo Ingreso</h2>
        <div className="formulario">
          <div className="lado-izquierdo">
            <div 
              className="zona-soltar-foto" 
              onDrop={manejarSoltarImagen} 
              onDragOver={manejarArrastreSobre}
            >
              {imagen ? (
                <img src={imagen} alt="Vista previa" className="imagen-preview" />
              ) : (
                <p>Arrastra y suelta la foto aquí</p>
              )}
            </div>
            <div className="tallas">
              <h3>Talles</h3>
              <div className="opciones-talles">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
                <button>XXL</button>
              </div>
            </div>
          </div>

          <div className="lado-derecho">
            <div className="precio">
              <h3>Precio</h3>
              <input type="text" placeholder="$$$" />
            </div>
            <div className="nombre-modelo">
              <h3>Nombre del Modelo</h3>
              <input type="text" placeholder="Nombre del modelo" />
            </div>
            <div className="estilo-ropa">
              <h3>Estilo de Ropa</h3>
              <select onChange={manejarCambioEstilo} value={estiloSeleccionado}>
                <option value="Urbana">Urbana</option>
                <option value="Deportiva">Deportiva</option>
              </select>
            </div>
            <div className="tipo-ropa">
              <h3>Tipo de Ropa</h3>
              <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)}>
                {opcionesTipoRopa[estiloSeleccionado].map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <button className="boton-anadir">Añadir Nuevo Ingreso</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;