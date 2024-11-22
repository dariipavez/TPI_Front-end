import React, { useState } from 'react';
import axios from 'axios';

const ModalRegistro = ({ isOpen, onClose, onRegistroSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    const datosRegistro = {
      nombre,
      fecha_nacimiento: fechaNacimiento,
      correo,
      nombre_usuario: usuarioRegistro,
      contraseña: contraseñaRegistro,
      telefono
    };

    axios.post('http://localhost:3000/api/usuario/registrarse', datosRegistro)
      .then((resp) => {
        if (resp.data.status === "ok") {
          alert('Registro exitoso');
          onRegistroSuccess();
          onClose();
        } else {
          alert('Hubo un error al registrarse');
        }
      })
      .catch((error) => {
        console.error('Error al registrarse:', error);
        alert('Hubo un error al registrarse');
      });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
          <button className="absolute top-4 left-4 text-white text-xl font-bold" onClick={onClose}>Volver</button>
          <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={onClose}>X</button>
          <h2 className="text-xl font-bold mb-6 text-white text-center mt-10">Únete a nosotros</h2>
          <form onSubmit={manejarEnvioRegistro}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="Fecha de nacimiento"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={usuarioRegistro}
                onChange={(e) => setUsuarioRegistro(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={contraseñaRegistro}
                onChange={(e) => setContraseñaRegistro(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700">Crear</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalRegistro;
