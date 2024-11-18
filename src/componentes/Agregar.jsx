import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Agregar.css';

const Agregar = ({ onNuevoProducto }) => {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");
  const [idMarca, setIdMarca] = useState("");
  const [idTipoProducto, setIdTipoProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idTalle, setIdTalle] = useState("");

  const manejarSoltarImagen = (evento) => {
    evento.preventDefault();
    const archivo = evento.dataTransfer.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      setImagen(archivo);
    }
  };

  const manejarArrastreSobre = (evento) => {
    evento.preventDefault();
  };

  const manejarEnvio = async () => {
    if (!onNuevoProducto || typeof onNuevoProducto !== "function") {
      console.error("onNuevoProducto no es una función válida");
      alert("Hubo un error al intentar añadir el producto.");
      return;
    }

    if (!nombre || !idMarca || !idTipoProducto || !precio || !stock || !idTalle || !imagen) {
      alert("Por favor, completa todos los campos antes de añadir el producto.");
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('id_marca', idMarca);
    formData.append('id_tipo_producto', idTipoProducto);
    formData.append('precio', precio);
    formData.append('stock', stock);
    formData.append('id_talle', idTalle);
    formData.append('imagenes', imagen);

    try {
      const response = await fetch("http://localhost:3000/api/registrar/producto", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al registrar el producto en la base de datos");
      }

      const data = await response.json();
      onNuevoProducto(data);
      setNombre("");
      setIdMarca("");
      setIdTipoProducto("");
      setPrecio("");
      setStock("");
      setIdTalle("");
      setImagen(null);
      alert("Producto añadido correctamente al menú y registrado en la base de datos.");
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      alert("Hubo un error al intentar añadir el producto.");
    }
  };

  return (
    <div className="contenedor-agregar">
      <Navbar />
      <div className="contenido-agregar">
        <h2>Añadir Nuevo Ingreso</h2>
        <div className="formulario">
          <div
            className="zona-soltar-foto"
            onDrop={manejarSoltarImagen}
            onDragOver={manejarArrastreSobre}
          >
            {imagen ? (
              <img
                src={URL.createObjectURL(imagen)}
                alt="Vista previa"
                className="imagen-preview"
              />
            ) : (
              <p>Arrastra y suelta la foto aquí</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            placeholder="ID de Marca"
            value={idMarca}
            onChange={(e) => setIdMarca(e.target.value)}
          />
          <input
            type="number"
            placeholder="ID de Tipo de Producto"
            value={idTipoProducto}
            onChange={(e) => setIdTipoProducto(e.target.value)}
          />
          <input
            type="text"
            placeholder="Precio del producto"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock disponible"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            type="number"
            placeholder="ID del Talle"
            value={idTalle}
            onChange={(e) => setIdTalle(e.target.value)}
          />
          <button onClick={manejarEnvio}>Añadir Nuevo Ingreso</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agregar;
