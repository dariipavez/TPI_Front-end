// Perfil.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Perfil.css';

const Perfil = () => {
  const [datosPerfil, setDatosPerfil] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    dni: '',
    genero: '',
    telefono: ''
  });
  const [estaEditando, setEstaEditando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosPerfil((datosPrevios) => ({ ...datosPrevios, [name]: value }));
  };

  const manejarClickEditar = () => {
    setEstaEditando(true);
  };

  const manejarClickGuardar = () => {
    setEstaEditando(false);
    // Aquí puedes agregar lógica para guardar los datos, si es necesario
  };

  return (
    <div>
      <Navbar />
      <div className="contenedor-perfil">
        <div className="barra-lateral-perfil">
          <button className="boton-barra-lateral">Perfil</button>
          <button className="boton-barra-lateral">Cerrar sesión</button>
        </div>
        <div className="contenido-perfil">
          <h2>Perfil</h2>
          <div className="tarjeta-perfil">
            <div className="fila-perfil">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={datosPerfil.nombre}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={datosPerfil.apellido}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
            </div>
            <div className="fila-perfil">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={datosPerfil.correo}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
              <input
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de nacimiento"
                value={datosPerfil.fechaNacimiento}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
            </div>
            <div className="fila-perfil">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={datosPerfil.dni}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
              <select
                name="genero"
                value={datosPerfil.genero}
                onChange={manejarCambio}
                disabled={!estaEditando}
              >
                <option value="">Seleccionar Género</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="fila-perfil">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={datosPerfil.telefono}
                onChange={manejarCambio}
                disabled={!estaEditando}
              />
            </div>
            {estaEditando ? (
              <button className="boton-guardar" onClick={manejarClickGuardar}>
                Guardar
              </button>
            ) : (
              <button className="boton-editar" onClick={manejarClickEditar}>
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;