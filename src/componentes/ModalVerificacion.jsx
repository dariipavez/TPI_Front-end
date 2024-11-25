import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalContraseña from './ModalContraseña';

const ModalVerificacion = ({ esAbierto, cerrar }) => {
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false);
  const [mailVerificar, setMailVerificar] = useState('');
  const [nombreCompletoVerificar, setNombreCompletoVerificar] = useState('');
  const [telefonoVerificar, setTelefonoVerificar] = useState('');

  const abrirModalContraseña = () => setEsModalContraseñaAbierto(true);
  const cerrarModalContraseña = () => setEsModalContraseñaAbierto(false);

  useEffect(() => {
    if (esAbierto) {
      setMailVerificar('');
      setNombreCompletoVerificar('');
      setTelefonoVerificar('');
    }
  }, [esAbierto]);

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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={cerrar}>X</button>
            <h2 className="text-xl font-bold mb-6 text-white text-center mt-10">Verifica tus datos</h2>
            <form onSubmit={manejarVerificarDatos}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                  value={mailVerificar}
                  onChange={(e) => setMailVerificar(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                  value={nombreCompletoVerificar}
                  onChange={(e) => setNombreCompletoVerificar(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                  value={telefonoVerificar}
                  onChange={(e) => setTelefonoVerificar(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700">Verificar</button>
            </form>
          </div>
        </div>
      )}
      
      <ModalContraseña isOpen={esModalContraseñaAbierto} onClose={cerrarModalContraseña} />
    </>
  );
};

export default ModalVerificacion;
