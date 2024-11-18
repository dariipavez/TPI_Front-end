// src/componentes/Usuarios.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';  // Asegúrate de importar el Navbar
import Footer from './Footer';  // Asegúrate de importar el Footer
import './Usuarios.css';  // Importamos el CSS

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@mail.com' },
    // Puedes añadir más usuarios de prueba o conectarlos con una API
  ]);

  const agregarUsuario = () => {
    // Lógica para agregar un usuario
    const nuevoUsuario = { id: usuarios.length + 1, nombre: 'Nuevo Usuario', email: 'nuevo@mail.com' };
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="contenedor-admin">
        <h2>Administrar Usuarios</h2>
        
        {/* Botón de Agregar fuera de la tabla */}
        <button className="btn-agregar" onClick={agregarUsuario}>Agregar Usuario</button>

        {/* Título de la lista de usuarios */}
        <h3>Lista de Usuarios</h3>

        {/* Tabla de usuarios */}
        <div className="lista-usuarios">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td className="acciones">
                    {/* Botones de acción */}
                    <button className="btn-listar">Listar</button>
                    <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
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

export default Usuarios;