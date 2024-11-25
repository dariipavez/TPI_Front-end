import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const ModalRegistro = ({ isOpen, onClose, onRegistroSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    const datos = {
        nombre_completo: nombre,
        fecha_nac: fechaNacimiento,
        mail: correo,
        nombre_usuario: usuarioRegistro,
        contraseña: contraseñaRegistro,
        telefono: telefono,
    };

    const url = "http://localhost:3000/api/usuario/registrarse";
    axios.post(url, datos)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status === "ok") {
          alert('Registro exitoso');
          setEsModalRegistroAbierto(false); // Cerrar modal después de registro
          setEsModalAbierto(true); // Abrir modal de login
        } else {
          alert('Error en el registro');
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un problema al registrarse");
      });
  };


  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <button className="modal-back" onClick={onClose}>Volver</button>
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>Únete a nosotros</h2>
          <form onSubmit={manejarEnvioRegistro}>
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
            <button type="submit" className="modal-submit-dark">Crear</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalRegistro;