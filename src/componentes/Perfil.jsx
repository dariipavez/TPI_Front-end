import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const Perfil = () => {
  const [datosPerfil, setDatosPerfil] = useState({
    nombre_usuario: '',
    nombre_completo: '',
    mail: '',
    fecha_nac: '',
    telefono: ''
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const obtenerPerfil = () => {
      const usuario_id = sessionStorage.getItem('usuario_id');
      const token = sessionStorage.getItem('token');
      if (!usuario_id || !token) {
        console.error('No se encontró el ID de usuario o el token.');
        return;
      }

      const config = {
        headers: {
          Authorization: token
        }
      };
      const url = `http://localhost:3000/api/rutasUsuario/ver/perfil/${usuario_id}`;
      axios.get(url, config)
        .then((resp) => {
          if (resp.data.usuario) {
            const data = resp.data.usuario;
            setDatosPerfil({
              nombre_usuario: data.nombre_usuario,
              nombre_completo: data.nombre_completo,
              mail: data.mail,
              fecha_nac: new Date(data.fecha_nac).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }),
              telefono: data.telefono
            });
          } else {
            console.error('No se encontraron datos del usuario.');
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos del perfil:', error);
        });
    };

    obtenerPerfil();
  }, []);

  const manejarInput = (e) => {
    const { name, value } = e.target;
    setDatosPerfil(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const guardarDatos = () => {
    const usuario_id = sessionStorage.getItem('usuario_id');
    const token = sessionStorage.getItem('token');
    if (!usuario_id || !token) {
      console.error('No se encontró el ID de usuario o el token.');
      return;
    }
    const datosActualizados = { ...datosPerfil, fecha_nac: new Date(datosPerfil.fecha_nac).toISOString().split('T')[0] };
    const config = {
      headers: {
        Authorization: token
      }
    };
    const url = `http://localhost:3000/api/usuario/actualizar/${usuario_id}`;
    axios.put(url, datosActualizados, config)
      .then((resp) => {
        console.log("Datos actualizados:", resp.data);
        setEditando(false);
      })
      .catch((error) => {
        console.error('Error al actualizar los datos del perfil:', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-4">Perfil</h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h3 className="md:w-1/3">Nombre de Usuario:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="nombre_usuario" 
                  value={datosPerfil.nombre_usuario} 
                  onChange={manejarInput}
                  className="mt-1 md:mt-0 p-2 w-full md:w-2/3 border border-gray-300 rounded"
                />
              ) : (
                <p className="md:w-2/3">{datosPerfil.nombre_usuario}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h3 className="md:w-1/3">Nombre:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="nombre_completo" 
                  value={datosPerfil.nombre_completo} 
                  onChange={manejarInput}
                  className="mt-1 md:mt-0 p-2 w-full md:w-2/3 border border-gray-300 rounded"
                />
              ) : (
                <p className="md:w-2/3">{datosPerfil.nombre_completo}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h3 className="md:w-1/3">Mail:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="mail" 
                  value={datosPerfil.mail} 
                  onChange={manejarInput}
                  className="mt-1 md:mt-0 p-2 w-full md:w-2/3 border border-gray-300 rounded"
                />
              ) : (
                <p className="md:w-2/3">{datosPerfil.mail}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h3 className="md:w-1/3">Fecha de Nacimiento:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="fecha_nac" 
                  value={datosPerfil.fecha_nac} 
                  onChange={manejarInput}
                  className="mt-1 md:mt-0 p-2 w-full md:w-2/3 border border-gray-300 rounded"
                />
              ) : (
                <p className="md:w-2/3">{datosPerfil.fecha_nac}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h3 className="md:w-1/3">Teléfono:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="telefono" 
                  value={datosPerfil.telefono} 
                  onChange={manejarInput}
                  className="mt-1 md:mt-0 p-2 w-full md:w-2/3 border border-gray-300 rounded"
                />
              ) : (
                <p className="md:w-2/3">{datosPerfil.telefono}</p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (editando) {
                    guardarDatos();
                  } else {
                    setEditando(true);
                  }
                }}
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              >
                {editando ? 'Guardar' : 'Editar'}
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
