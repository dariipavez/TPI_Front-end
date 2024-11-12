import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Perfil.css';

const Perfil = () => {
  const [perfilData, setPerfilData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    dni: '',
    genero: '',
    telefono: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfilData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Aquí puedes agregar lógica para guardar los datos, si es necesario
  };

  return (
    <div>
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-sidebar">
          <button className="sidebar-button">Perfil</button>
          <button className="sidebar-button">Cerrar sesión</button>
        </div>
        <div className="perfil-content">
          <h2>Perfil</h2>
          <div className="perfil-card">
            <div className="perfil-row">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={perfilData.nombre}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={perfilData.apellido}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={perfilData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <input
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de nacimiento"
                value={perfilData.fechaNacimiento}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={perfilData.dni}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <select
                name="genero"
                value={perfilData.genero}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Seleccionar Género</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="perfil-row">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={perfilData.telefono}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <button className="guardar-boton" onClick={handleSaveClick}>
                Guardar
              </button>
            ) : (
              <button className="editar-boton" onClick={handleEditClick}>
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
