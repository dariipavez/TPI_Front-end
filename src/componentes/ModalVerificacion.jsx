import React, { useState } from 'react';
import axios from 'axios';
import ModalContraseña from './ModalContraseña'; // Importa el componente del modal de cambio de contraseña
import './Modal.css';

const ModalVerificacion = ({ esAbierto, cerrar }) => {
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false);
  const [mailVerificar, setMailVerificar] = useState('');
  const [nombreCompletoVerificar, setNombreCompletoVerificar] = useState('');
  const [telefonoVerificar, setTelefonoVerificar] = useState('');

  const abrirModalContraseña = () => setEsModalContraseñaAbierto(true);
  const cerrarModalContraseña = () => setEsModalContraseñaAbierto(false);

  const manejarVerificarDatos = (e) => {
    e.preventDefault();

    const datosVerificacion = {
      mail: mailVerificar,
      nombre_completo: nombreCompletoVerificar,
      telefono: telefonoVerificar
    };

    axios.post("http://localhost:3000/api/usuario/verificar/datos", datosVerificacion)
      .then((response) => {
        if (response.data.status === "ok") {
          sessionStorage.setItem('usuario_id', response.data.usuario_id);
          alert("Datos verificados con éxito.");
          cerrar();
          abrirModalContraseña();
        } else {
          alert("Datos incorrectos. Intente nuevamente.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("El usuario no fue encontrado. Verifique los datos.");
        } else {
          console.error(error);
          alert("Hubo un error al verificar los datos.");
        }
      });
  };

  return (
    <>
      {esAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrar}>X</button>
            <h2>Verifica tus datos</h2>
            <form onSubmit={manejarVerificarDatos}>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="modal-input"
                value={mailVerificar}
                onChange={(e) => setMailVerificar(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre completo"
                className="modal-input"
                value={nombreCompletoVerificar}
                onChange={(e) => setNombreCompletoVerificar(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="modal-input"
                value={telefonoVerificar}
                onChange={(e) => setTelefonoVerificar(e.target.value)}
              />
              <button type="submit" className="modal-submit">Verificar</button>
            </form>
          </div>
        </div>
      )}
      
      <ModalContraseña isOpen={esModalContraseñaAbierto} onClose={cerrarModalContraseña} />
    </>
  );
};

export default ModalVerificacion;
