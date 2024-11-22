import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';  // Asegúrate de importar el Navbar
import Footer from './Footer';  // Asegúrate de importar el Footer
import axios from 'axios';
import './Usuarios.css';  // Importamos el CSS

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('usuario');
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Obtener usuarios desde la base de datos
  const obtenerUsuarios = () => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:3000/api/rutasAdmin/ver/usuario', {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      console.log('Usuarios obtenidos:', response.data.usuarios);
      setUsuarios(response.data.usuarios);
    })
    .catch((error) => {
      console.error('Hubo un problema al obtener los usuarios:', error);
    });
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const manejarEnvioUsuario = (e) => {
    e.preventDefault();

    const datos = {
      nombre_completo: nombre,
      fecha_nac: fechaNacimiento,
      mail: correo,
      nombre_usuario: usuarioRegistro,
      contraseña: contraseñaRegistro,
      telefono: telefono,
      rol: rol
    };

    const token = sessionStorage.getItem('token');

    // Agregar nuevo usuario
    axios.post('http://localhost:3000/api/usuario/crear', datos, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      obtenerUsuarios(); // Volver a obtener la lista de usuarios después de agregar uno nuevo
      setNombre('');
      setFechaNacimiento('');
      setCorreo('');
      setUsuarioRegistro('');
      setContraseñaRegistro('');
      setTelefono('');
      setRol('usuario');
      alert('Usuario creado exitosamente');
    })
    .catch((error) => {
      console.error('Hubo un problema al agregar el usuario:', error);
    });
  };

  const eliminarUsuario = (id) => {
    const token = sessionStorage.getItem('token');
    axios.delete(`http://localhost:3000/api/usuario/eliminar/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      obtenerUsuarios(); // Volver a obtener la lista de usuarios después de eliminar uno
      alert('Usuario eliminado exitosamente');
    })
    .catch((error) => {
      console.error('Hubo un problema al eliminar el usuario:', error);
    });
  };

  const manejarEditarRol = (usuario) => {
    setUsuarioActual(usuario);
    setRol(''); // Dejar el campo de rol vacío inicialmente
  };

  const manejarCambioRol = (e) => {
    const { value } = e.target;
    setRol(value);
  };

  const actualizarRol = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const datos = {
      rol: rol
    };

    axios.put(`http://localhost:3000/api/usuario/actualizar/${usuarioActual.id}`, datos, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      obtenerUsuarios();
      setUsuarioActual(null);
      alert('Rol actualizado exitosamente');
    })
    .catch((error) => {
      console.error('Hubo un problema al actualizar el rol del usuario:', error);
    });
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div>
      <Navbar />
      <div className="contenedor-admin">
        <h2>Administrar Usuarios</h2>
        
        {/* Formulario de Usuario */}
        <form onSubmit={manejarEnvioUsuario}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={usuarioRegistro}
            onChange={(e) => setUsuarioRegistro(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseñaRegistro}
            onChange={(e) => setContraseñaRegistro(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <select value={rol} onChange={(e) => setRol(e.target.value)} required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
          <button type="submit" className="btn-agregar">
            Agregar Usuario
          </button>
        </form>

        {/* Título de la lista de usuarios */}
        <h3>Lista de Usuarios</h3>

        {/* Tabla de usuarios */}
        <div className="lista-usuarios">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Email</th>
                <th>Nombre de Usuario</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                usuario && ( // Asegurarse de que usuario no sea undefined
                <tr key={usuario.id}>
                  <td>{usuario.nombre_completo}</td>
                  <td>{formatFecha(usuario.fecha_nac)}</td>
                  <td>{usuario.mail}</td>
                  <td>{usuario.nombre_usuario}</td>
                  <td>{usuario.telefono}</td>
                  <td>
                    {usuarioActual && usuarioActual.id === usuario.id ? (
                      <form onSubmit={actualizarRol}>
                        <select value={rol} onChange={manejarCambioRol} required>
                          <option value="" disabled>Selecciona un rol</option>
                          <option value="usuario">Usuario</option>
                          <option value="administrador">Administrador</option>
                        </select>
                        <button type="submit">Guardar</button>
                      </form>
                    ) : (
                      usuario.rol
                    )}
                  </td>
                  <td className="acciones">
                    <button className="btn-editar" onClick={() => manejarEditarRol(usuario)}>Editar Rol</button>
                    <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Usuarios;
