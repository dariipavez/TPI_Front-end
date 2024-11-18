import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Perfil.css';

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
    <div>
      <Navbar />
      <div className="contenedor-perfil">
        <div className="barra-lateral-perfil">
          <button className="boton-barra-lateral">Perfil</button>
          <button
            className="boton-barra-lateral"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = '/';
            }}
          >
            Cerrar sesión
          </button>
        </div>
        <div className="contenido-perfil">
          <h2>Perfil</h2>
          <div className="tarjeta-perfil">
            <div className="fila-perfil">
              <h3>Nombre de Usuario</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="nombre_usuario" 
                  value={datosPerfil.nombre_usuario} 
                  onChange={manejarInput} 
                />
              ) : (
                <p>{datosPerfil.nombre_usuario}</p>
              )}
              <h3>Nombre:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="nombre_completo" 
                  value={datosPerfil.nombre_completo} 
                  onChange={manejarInput} 
                />
              ) : (
                <p>{datosPerfil.nombre_completo}</p>
              )}
            </div>
            <div className="fila-perfil">
              <h3>Mail:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="mail" 
                  value={datosPerfil.mail} 
                  onChange={manejarInput} 
                />
              ) : (
                <p>{datosPerfil.mail}</p>
              )}
              <h3>Fecha de Nacimiento</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="fecha_nac" 
                  value={datosPerfil.fecha_nac} 
                  onChange={manejarInput} 
                />
              ) : (
                <p>{datosPerfil.fecha_nac}</p>
              )}
            </div>
            <div className="fila-perfil">
              <h3>Teléfono:</h3>
              {editando ? (
                <input 
                  type="text" 
                  name="telefono" 
                  value={datosPerfil.telefono} 
                  onChange={manejarInput} 
                />
              ) : (
                <p>{datosPerfil.telefono}</p>
              )}
            </div>
          <button onClick={() => {
            if (editando) {
              guardarDatos();
            } else {
              setEditando(true);
            }
          }}>
            {editando ? 'Guardar' : 'Editar'}
          </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
