import React, { useState } from 'react';
import axios from 'axios';
import ModalRegistro from './ModalRegistro'; // Importa el componente del modal de registro
import ModalVerificacion from './ModalVerificacion'; // Importa el componente del modal de verificación
import './Modal.css';

const ModalLogin = ({ esAbierto, cerrar }) => {
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false);
  const [esModalVerificacionAbierto, setEsModalVerificacionAbierto] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);

  const abrirModalRegistro = () => {
    cerrar();
    setEsModalRegistroAbierto(true);
  };
  const cerrarModalRegistro = () => setEsModalRegistroAbierto(false);

  const abrirModalVerificacion = () => {
    cerrar();
    setEsModalVerificacionAbierto(true);
  };
  const cerrarModalVerificacion = () => setEsModalVerificacionAbierto(false);

  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        const token = resp.data.token;
        const usuario_id = resp.data.usuario_id;
        const rol = resp.data.rol;
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('usuario_id', usuario_id);
          sessionStorage.setItem('rol', rol);
          setToken(token);
          setLogged(true);
          alert('Inicio de sesión exitoso');
          cerrar();
        } else {
          alert('No se pudo conectar al servidor');
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Usuario/Contraseña incorrecta");
      });
  };

  return (
    <>
      {esAbierto && !logged && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <form onSubmit={(e) => { e.preventDefault(); loguearse({ nombre_usuario: user, contraseña: pass, token }); }}>
              <button className="modal-close" onClick={cerrar}>X</button>
              <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>
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
            <p><a className='registrarse' href="#" onClick={abrirModalVerificacion}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene cuenta? <a className='registrarse' href="#" onClick={abrirModalRegistro}>Regístrate</a></p>
          </div>
        </div>
      )}
      
      <ModalRegistro esAbierto={esModalRegistroAbierto} cerrar={cerrarModalRegistro} />
      <ModalVerificacion esAbierto={esModalVerificacionAbierto} cerrar={cerrarModalVerificacion} />
    </>
  );
};

export default ModalLogin;