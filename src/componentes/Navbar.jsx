// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import './Navbar.css';
import './Modal.css';
import axios from 'axios'

const Navbar = ({ onBuscar, esMenuPerfilAbierto, setEsMenuPerfilAbierto }) => {
  const [, navegar] = useLocation();

  // Estado para controlar la apertura de cada modal
  const [esModalAbierto, setEsModalAbierto] = useState(false); // Modal de inicio de sesión
  const [esModalRegistroAbierto, setEsModalRegistroAbierto] = useState(false); // Modal de registro
  const [esModalCarritoAbierto, setEsModalCarritoAbierto] = useState(false); // Modal del carrito
  const [esModalContraseñaAbierto, setEsModalContraseñaAbierto] = useState(false); // Modal de cambiar contraseña
  const [esModalOlvidoContraseñaAbierto, setEsModalOlvidoContraseñaAbierto] = useState(false); // Modal de olvido contraseña
  const [esModalVerificacionAbierto, setEsModalVerificacionAbierto] = useState(false);
  const [mailVerificar, setMailVerificar] = useState('');
  const [nombreCompletoVerificar, setNombreCompletoVerificar] = useState('');
  const [telefonoVerificar, setTelefonoVerificar] = useState('');
  
  const abrirModalVerificacion = () => {
    setEsModalAbierto(false);  // Cerrar el modal de login si estaba abierto
    setEsModalVerificacionAbierto(true);
  };
  
  const cerrarModalVerificacion = () => setEsModalVerificacionAbierto(false);
  

  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mailRecuperar, setMailRecuperar] = useState(''); 

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
      setLogged(true);
    }
  }, []);

  // Funciones para abrir y cerrar cada modal
  const abrirModal = () => setEsModalAbierto(true);
  const cerrarModal = () => setEsModalAbierto(false);

  const abrirModalRegistro = () => {
    setEsModalAbierto(false);
    setEsModalRegistroAbierto(true);
  };
  const cerrarModalRegistro = () => setEsModalRegistroAbierto(false);

  const abrirModalCarrito = () => setEsModalCarritoAbierto(true);
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);

  const abrirModalContraseña = () => {
    setEsModalAbierto(false);
    setEsModalContraseñaAbierto(true);
  };
  const cerrarModalContraseña = () => setEsModalContraseñaAbierto(false);

  const abrirModalOlvidoContraseña = () => {
    setEsModalAbierto(false);
    setEsModalOlvidoContraseñaAbierto(true);
  };
  const cerrarModalOlvidoContraseña = () => setEsModalOlvidoContraseñaAbierto(false);

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    cerrarModalRegistro();
    navegar('/');
  };

  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        const token=resp.data.token
        const usuario_id=resp.data.usuario_id
        const rol=resp.data.rol
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('usuario_id',usuario_id)
          sessionStorage.setItem('rol', rol)
          setToken(resp.data.token);
          setLogged(true);
          alert('Inicio de sesión exitoso');
          cerrarModal();
        } else {
          alert('No se pudo conectar al servidor');
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Usuario/Contraseña incorrecta");
      });
  };

  const manejarClickPerfil = () => {
    if (logged) {
      navegar('/perfil');
    } else {
      abrirModal();
    }
  };

  
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
                cerrarModalVerificacion();
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
                cerrarModalContraseña();
            } else {
                alert("Error al cambiar la contraseña.");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Hubo un error al cambiar la contraseña.");
        });
};
  
  
  
  
  

  return (
    <header className="menu-header">
      <div className="logo" onClick={() => navegar('/')}>
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen" />
      </div>

      <nav className="menu-categorias">
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-urbana')}>Ropa Urbana</span>
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/remeras')}>
              <strong>Remeras</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/pantalones')}>
              <strong>Pantalones</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-urbana/zapatillas')}>
              <strong>Zapatillas</strong>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-deportiva')}>Ropa Deportiva</span>
          <div className="dropdown-menu">
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/camisetas')}>
              <strong>Camisetas</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/shorts')}>
              <strong>Shorts</strong>
            </div>
            <div className="dropdown-column" onClick={() => navegar('/ropa-deportiva/buzos')}>
              <strong>Buzos</strong>
            </div>
          </div>
        </div>
      </nav>

      <input
        type="text"
        placeholder="¿Qué estás buscando?"
        className="buscador"
        onChange={(e) => onBuscar(e.target.value)}
      />

      <div className="menu-iconos">
        <span className="icono-usuario" onClick={manejarClickPerfil}>👤</span>
        <span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>
      </div>

      {/* Modal de Login */}
      {esModalAbierto && !logged && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <form onSubmit={(e) => { e.preventDefault(); loguearse({ nombre_usuario: user, contraseña: pass, token }); }}>
              <button className="modal-close" onClick={cerrarModal}>X</button>
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
            <p><a href="#" onClick={abrirModalVerificacion}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene cuenta? <a href="#" onClick={abrirModalRegistro}>Regístrate</a></p>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {esModalRegistroAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalRegistro}>X</button>
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
      )}

      {/* Modal de Recuperación de Contraseña */}

      {/* Modal de Cambio de Contraseña */}
      {esModalVerificacionAbierto && (
        <div className="modal-overlay">
    <div className="modal-contenido">
      <button className="modal-close" onClick={cerrarModalVerificacion}>X</button>
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
        {esModalContraseñaAbierto && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <button className="modal-close" onClick={cerrarModalContraseña}>X</button>
              <h2>Cambiar Contraseña</h2>
              <form onSubmit={manejarCambiarContraseña}>
                <input
                  type="password"
                  name="nuevaContraseña"
                  placeholder="Nueva Contraseña"
                  className="modal-input"
                  value={nuevaContraseña}
                  onChange={manejarNuevaContraseña}
                />
                <input
                  type="password"
                  name="confirmarContraseña"
                  placeholder="Confirmar Contraseña"
                  className="modal-input"
                  value={confirmarContraseña}
                  onChange={manejarConfirmarContraseña}
                />
                <button type="submit" className="modal-submit">Cambiar Contraseña</button>
              </form>
            </div>
          </div>
        )}
      {/* Modal de Carrito */}
      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Carrito</h2>
            <p>Carrito vacío</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
