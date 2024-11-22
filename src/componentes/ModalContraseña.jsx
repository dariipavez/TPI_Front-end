import React, { useState } from 'react';
import axios from 'axios';

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
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
          <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={onClose}>X</button>
          <h2 className="text-xl font-bold mb-6 text-white text-center mt-10">Cambiar Contraseña</h2>
          <form onSubmit={manejarCambiarContraseña}>
            <div className="space-y-4">
              <input
                type="password"
                name="nuevaContraseña"
                placeholder="Nueva contraseña"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={nuevaContraseña}
                onChange={manejarNuevaContraseña}
                required
              />
              <input
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar nueva contraseña"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={confirmarContraseña}
                onChange={manejarConfirmarContraseña}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700">Cambiar</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalContraseña;
