import React from 'react';
import './Modal.css';

const ModalRegistro = ({ esAbierto, cerrar }) => {
  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    cerrar();
  };

  return (
    esAbierto && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <button className="modal-close" onClick={cerrar}>X</button>
          <h2>Regístrate para obtener tu cuenta</h2>
          <form onSubmit={manejarEnvioRegistro}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="modal-input"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="modal-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="modal-input"
            />
            <button type="submit" className="modal-submit">Registrarse</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalRegistro;