import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalLogin = ({ isOpen, onClose, onLoginSuccess, abrirModalVerificacion, abrirModalRegistro }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUser('');
      setPass('');
    }
  }, [isOpen]);

  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        if (resp.data.status === "ok") {
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario_id', resp.data.usuario_id);
          sessionStorage.setItem('rol', resp.data.rol);

          const { token, rol } = resp.data;
          if (token) {
            alert('Inicio de sesión exitoso');
            onLoginSuccess(token, rol);
            onClose();
          } else {
            alert('No se pudo conectar al servidor');
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Usuario/Contraseña incorrecta");
      });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
          <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={onClose}>X</button>
          <h2 className="text-xl font-bold mb-6 text-white">Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
          <form onSubmit={(e) => { e.preventDefault(); 
            loguearse({ nombre_usuario: user, contraseña: pass }); }}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Usuario"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700">Entrar</button>
          </form>
          <div className="mt-6 text-center">
            <p><a href="#" className="text-blue-400 hover:underline" onClick={abrirModalVerificacion}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene una cuenta? <a href="#" className="text-blue-400 hover:underline" onClick={abrirModalRegistro}>Regístrese</a></p>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalLogin;
