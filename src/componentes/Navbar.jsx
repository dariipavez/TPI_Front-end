import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import './Navbar.css';
import './Modal.css';
import axios from 'axios';

const Navbar = ({ onBuscar }) => {
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

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [logged, setLogged] = useState(!!token);
  const [rol, setRol] = useState(sessionStorage.getItem('rol') || 'usuario'); // Estado para el rol del usuario
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

  // Estados para el registro
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');

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
        console.log('Respuesta completa del servidor:', resp.data);
        if (resp.data.status === "ok") {
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario_id', resp.data.usuario_id);
          sessionStorage.setItem('rol', resp.data.rol);
          
          const { token, usuario_id, rol } = resp.data;
          if (token) {
            setToken(token);
            setRol(rol);
            console.log('Rol del usuario:', rol);
            setLogged(true);
            setEsModalAbierto(false);
            alert('Inicio de sesión exitoso');
            cerrarModal();
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

  const manejarSubmit = (e) => {

    e.preventDefault();

    // Crear los datos del registro
    const datos = {
      nombre_completo: nombre,
      fecha_nac: fechaNacimiento,
      mail: correo,
      nombre_usuario: usuarioRegistro,
      contraseña: contraseñaRegistro,
      telefono: telefono,
    };


    console.log("Datos del registro:", datos);

    // Enviar los datos al servidor
    const url = "http://localhost:3000/api/usuario/registrarse";
    axios.post(url, datos)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status === "ok") {
          alert('Registro exitoso');
          cerrarModalRegistro(); // Cerrar modal después de registro
          abrirModal(); // Abrir modal de login
        } else {
          alert('Error en el registro');
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un problema al registrarse");
      });
  };

  // Función para manejar el cierre de sesión
  const cerrarSesion = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    setToken(null);
    setRol('usuario');
    setLogged(false);
    setEsMenuPerfilAbierto(false);
    alert('Sesión cerrada correctamente');
    navegar('/'); // Opcional: redirigir al usuario a la página principal
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRol = localStorage.getItem('rol');
    if (savedToken) {
      setToken(savedToken);
      setRol(savedRol || 'usuario');
      console.log('Rol guardado en localStorage:', savedRol); // Imprimir el rol guardado en localStorage en la consola
      setLogged(true);
    }
  }, []);

  
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
        {logged ? (
          <span 
            className="icono-usuario" 
            onClick={abrirMenuPerfil}
          >
            👤
            {esMenuPerfilAbierto && (
              <div className="profile-menu">
                <button 
                  className="profile-menu-item" 
                  onClick={() => navegar('/perfil')}
                >
                  Mi cuenta
                </button>
                {rol === 'administrador' && (
                  <>
                    <button 
                      className="profile-menu-item" 
                      onClick={() => navegar('/usuarios')}
                    >
                      Administrar usuarios
                    </button>
                    <button 
                      className="profile-menu-item" 
                      onClick={() => navegar('/agregar')}
                    >
                      Ingresar nuevo producto
                    </button>
                  </>
                )}
                <button 
                  className="profile-menu-item" 
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </span>
        ) : (
          <span className="icono-usuario" onClick={abrirModal}>👤</span>
        )}
        <span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>
      </div>

      {esModalAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModal}>X</button>
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
            <p><a href="#" onClick={abrirModalContraseña}>¿Olvidó su contraseña?</a></p>
            <p>¿No tiene una cuenta? <a href="#" onClick={abrirModalRegistro}>Regístrese</a></p>
          </div>
        </div>
      )}

      {esModalRegistroAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={abrirModal}>Volver</button>
            <button className="modal-close" onClick={cerrarModalRegistro}>X</button>
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
      )}

      {esModalContraseñaAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalContraseña}>X</button>
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={manejarSubmit}>
              <input
                type="password"
                name="nuevaContraseña"
                placeholder="Nueva contraseña"
                value={nuevaContraseña}
                onChange={manejarCambioContraseña}
                required
              />
              <input
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar nueva contraseña"
                value={confirmarContraseña}
                onChange={manejarCambioContraseña}
                required
              />
              <button type="submit" className="modal-submit">Cambiar</button>
            </form>
          </div>
        </div>
      )}

      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Tu Carrito</h2>
            {/* Aquí puedes agregar el contenido del carrito */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
