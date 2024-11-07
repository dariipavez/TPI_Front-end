import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Agregar.css';

const Agregar = () => {
  const [imagen, setImagen] = useState(null);
  const [estiloSeleccionado, setEstiloSeleccionado] = useState("Urbana");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Buzo");
  
  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEstiloChange = (event) => {
    const nuevoEstilo = event.target.value;
    setEstiloSeleccionado(nuevoEstilo);
    setTipoSeleccionado(opcionesTipoRopa[nuevoEstilo][0]); // Cambia automáticamente el tipo al primero de la lista
  };

  // Opciones de tipo de ropa según el estilo seleccionado
  const opcionesTipoRopa = {
    Urbana: ["Buzo", "Remera", "Pantalón", "Zapatillas"],
    Deportiva: ["Camiseta", "Buzo", "Short", "Medias"]
  };

  return (
    <div className="agregar-container">
      <Navbar />
      <div className="agregar-content">
        <h2>Añadir Nuevo Ingreso</h2>
        <div className="formulario">
          <div className="lado-izquierdo">
            <div 
              className="foto-dropzone" 
              onDrop={handleImageDrop} 
              onDragOver={handleDragOver}
            >
              {imagen ? (
                <img src={imagen} alt="Vista previa" className="imagen-preview" />
              ) : (
                <p>Arrastra y suelta la foto aquí</p>
              )}
            </div>
            <div className="tallas">
              <h3>Talles</h3>
              <div className="talles-options">
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
              <select onChange={handleEstiloChange} value={estiloSeleccionado}>
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
            <button className="add-button">Añadir Nuevo Ingreso</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;
