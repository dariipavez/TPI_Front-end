import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const ModalContraseña = ({ isOpen, onClose }) => {
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');

  const manejarNuevaContraseña = (e) => {
    setNuevaContraseña(e.target.value);
  };

  const manejarConfirmarContraseña = (e) => {
    setConfirmarContraseña(e.target.value);
  };

  const manejarCambiarContraseña = (e) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const usuario_id = sessionStorage.getItem('usuario_id');

    if (!usuario_id) {
      alert("Usuario no encontrado.");
      return;
    }

    const datosContraseña = {
      nueva_contraseña: nuevaContraseña
    };

    axios.put(`http://localhost:3000/api/usuario/actualizar/${usuario_id}`, datosContraseña)
      .then((resp) => {
        if (resp.data.status === "ok") {
          alert("Contraseña cambiada con éxito.");
          onClose();
        } else {
          alert("Hubo un error al cambiar la contraseña.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un error al cambiar la contraseña.");
      });
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>Cambiar Contraseña</h2>
          <form onSubmit={manejarCambiarContraseña}>
            <input
              type="password"
              name="nuevaContraseña"
              placeholder="Nueva contraseña"
              value={nuevaContraseña}
              onChange={manejarNuevaContraseña}
              required
            />
            <input
              type="password"
              name="confirmarContraseña"
              placeholder="Confirmar nueva contraseña"
              value={confirmarContraseña}
              onChange={manejarConfirmarContraseña}
              required
            />
            <button type="submit" className="modal-submit">Cambiar</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalContraseña;
