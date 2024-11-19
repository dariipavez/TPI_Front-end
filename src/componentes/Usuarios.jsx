import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import './Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [editando, setEditando] = useState(null);

  // Obtener usuarios desde la base de datos
  useEffect(() => {
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
    };

    const token = sessionStorage.getItem('token');

    if (modoEdicion) {
      // Editar usuario existente
      axios.put(`http://localhost:3000/api/usuario/${usuarioActual.id}`, datos, {
        headers: {
          Authorization: token
        }
      })
      .then((response) => {
        setUsuarios(usuarios.map((usuario) => (usuario.id === usuarioActual.id ? response.data.usuario : usuario)));
        setModoEdicion(false);
        setUsuarioActual(null);
        setNombre('');
        setFechaNacimiento('');
        setCorreo('');
        setUsuarioRegistro('');
        setContraseñaRegistro('');
        setTelefono('');
      })
      .catch((error) => {
        console.error('Hubo un problema al editar el usuario:', error);
      });
    } else {
      // Agregar nuevo usuario
      axios.post('http://localhost:3000/api/usuario/crear', datos, {
        headers: {
          Authorization: token
        }
      })
      .then((response) => {
        setUsuarios([...usuarios, response.data.usuario]);
        setNombre('');
        setFechaNacimiento('');
        setCorreo('');
        setUsuarioRegistro('');
        setContraseñaRegistro('');
        setTelefono('');
      })
      .catch((error) => {
        console.error('Hubo un problema al agregar el usuario:', error);
      });
    }
  };

  const manejarEditarUsuario = (usuario) => {
    setModoEdicion(true);
    setUsuarioActual(usuario);
    setEditando(usuario.id);
    setNombre(usuario.nombre_completo);
    setFechaNacimiento(formatFecha(usuario.fecha_nac)); // Formatear fecha
    setCorreo(usuario.mail);
    setUsuarioRegistro(usuario.nombre_usuario);
    setTelefono(usuario.telefono);
  };

  const manejarCambioUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const eliminarUsuario = (id) => {
    const token = sessionStorage.getItem('token');
    axios.delete(`http://localhost:3000/api/usuarios/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    })
    .catch((error) => {
      console.error('Hubo un problema al eliminar el usuario:', error);
    });
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const año = date.getFullYear();
    return `${año}-${mes}-${dia}`;
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
          <button type="submit" className="btn-agregar">
            {modoEdicion ? 'Guardar cambios' : 'Agregar Usuario'}
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="text"
                        name="nombre_completo"
                        value={usuarioActual?.nombre_completo || ''}
                        onChange={manejarCambioUsuario}
                      />
                    ) : (
                      usuario.nombre_completo
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="date"
                        name="fecha_nac"
                        value={usuarioActual?.fecha_nac || ''}
                        onChange={manejarCambioUsuario}
                      />
                    ) : (
                      formatFecha(usuario.fecha_nac)
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="email"
                        name="mail"
                        value={usuarioActual?.mail || ''}
                        onChange={manejarCambioUsuario}
                      />
                    ) : (
                      usuario.mail
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="text"
                        name="nombre_usuario"
                        value={usuarioActual?.nombre_usuario || ''}
                        onChange={manejarCambioUsuario}
                      />
                    ) : (
                      usuario.nombre_usuario
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="tel"
                        name="telefono"
                        value={usuarioActual?.telefono || ''}
                        onChange={manejarCambioUsuario}
                      />
                    ) : (
                      usuario.telefono
                    )}
                  </td>
                  <td className="acciones">
                    {editando === usuario.id ? (
                      <button className="btn-guardar" onClick={manejarEnvioUsuario}>Guardar</button>
                    ) : (
                      <>
                        <button className="btn-editar" onClick={() => manejarEditarUsuario(usuario)}>Editar</button>
                        <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                      </>
                    )}
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
