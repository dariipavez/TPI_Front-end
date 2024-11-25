import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const ModalLogin = ({ isOpen, onClose, onLoginSuccess, abrirModalVerificacion, abrirModalRegistro }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

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
      <div className="modal-overlay">
        <div className="modal-contenido">
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
          <form onSubmit={(e) => { e.preventDefault(); loguearse({ nombre_usuario: user, contraseña: pass }); }}>
            <input
              type="text"
              placeholder="Usuario"
              className="modal-input"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="modal-input"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit" className="modal-submit">Entrar</button>
          </form>
          <p><a href="#" onClick={abrirModalVerificacion}>¿Olvidó su contraseña?</a></p>
          <p>¿No tiene una cuenta? <a href="#" onClick={abrirModalRegistro}>Regístrese</a></p>
        </div>
      </div>
    )
  );
};

export default ModalLogin;