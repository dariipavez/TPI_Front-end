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
  const [esMenuPerfilAbierto, setEsMenuPerfilAbierto] = useState(false);
  const [esModalCarritoBloqueadoAbierto, setEsModalCarritoBloqueadoAbierto] = useState(false);
  const [mailVerificar, setMailVerificar] = useState('');
  const [nombreCompletoVerificar, setNombreCompletoVerificar] = useState('');
  const [telefonoVerificar, setTelefonoVerificar] = useState('');

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [logged, setLogged] = useState(!!token);
  const [rol, setRol] = useState(sessionStorage.getItem('rol') || 'usuario'); // Estado para el rol del usuario
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mailRecuperar, setMailRecuperar] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [telefono, setTelefono] = useState('');



  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    const obtenerCarrito = () => {
      const usuarioId = sessionStorage.getItem('usuario_id');
      const carritoLocal = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
      setCarrito(carritoLocal);
    };
    obtenerCarrito();
  }, [esModalCarritoAbierto]);

  // Funciones para abrir y cerrar cada modal
  const abrirModal = () => {
    setEsModalAbierto(true);
    cerrarModalCarritoBloqueado(); // Cerrar el modal de carrito bloqueado si está abierto
  };
  const cerrarModal = () => setEsModalAbierto(false);
  const abrirModalRegistro = () => {
    setEsModalAbierto(false);
    setEsModalRegistroAbierto(true);
  };
  const cerrarModalRegistro = () => setEsModalRegistroAbierto(false);
  const abrirModalCarrito = () => {
    if (logged) {
      setEsModalCarritoAbierto(true);
    } else {
      setEsModalCarritoBloqueadoAbierto(true);
    }
  };
  const cerrarModalCarrito = () => setEsModalCarritoAbierto(false);
  const cerrarModalCarritoBloqueado = () => setEsModalCarritoBloqueadoAbierto(false);
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
  const abrirMenuPerfil = () => {
    setEsMenuPerfilAbierto(!esMenuPerfilAbierto);
  };

  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        if (resp.data.status === "ok") {
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario_id', resp.data.usuario_id);
          sessionStorage.setItem('rol', resp.data.rol);

          const { token, usuario_id, rol } = resp.data;
          if (token) {
            setToken(token);
            setRol(rol);
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

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    cerrarModalRegistro();
    navegar('/');
  };
  const manejarSubmit=(e)=>{
    e.preventDefault();
    cerrarModal();
    navegar('');
  }

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
const manejarNuevaContraseña=(e)=>{
  e.preventDefault();
}
const manejarConfirmarContraseña=(e)=>{
  e.preventDefault();
}

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
          alert("Hubo un error al cambiar la contraseña.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un error al cambiar la contraseña.");
      });
  };

  const cerrarSesion = () => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('usuario_id');
    localStorage.removeItem(`carrito_${usuarioId}`);
    setToken(null);
    setRol('usuario');
    setLogged(false);
    setEsMenuPerfilAbierto(false);
    alert('Sesión cerrada correctamente');
    navegar('/');
  };

  const eliminarProducto = (id, talle) => {
    const usuarioId = sessionStorage.getItem('usuario_id');
    const carritoActualizado = carrito.filter(producto => !(producto.id === id && producto.talle === talle));
    setCarrito(carritoActualizado);
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(carritoActualizado));
  };

  return (
    <header className="menu-header">
      <div className="logo" onClick={() => navegar('/')}>
        <img src="/MDT.png" alt="Logo MDT" className="logo-imagen" />
      </div>

      <nav className="menu-categorias">
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-urbana')}>Ropa Urbana</span>
        </div>
        <div className="menu-item">
          <span onClick={() => navegar('/ropa-deportiva')}>Ropa Deportiva</span>
        </div>
      </nav>

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
                <button 
                  className="profile-menu-item" 
                  onClick={() => navegar('/compras')}
                >
                  Mis Compras
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
      )}

      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Carro de compras</h2>
            {carrito.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              carrito.map((producto, index) => (
                <div key={index} className="carrito-producto">
                  <img src={producto.ruta_imagen} alt={producto.nombre} className="carrito-producto-imagen" />
                  <div className="carrito-producto-info">
                    <h3>{producto.nombre}</h3>
                    <p>Talle: {producto.talle}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio: ${producto.precio}</p>
                    <button onClick={() => eliminarProducto(producto.id, producto.talle)}>Eliminar</button>
                  </div>
                </div>
              ))
            )}
            <button className="boton-continuar-compra" onClick={() => navegar('/confirmacion')}>Continuar compra</button>
          </div>
        </div>
      )}

      {esModalCarritoBloqueadoAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-close" onClick={cerrarModalCarritoBloqueado}>X</button>
            <h2>Inicia sesión para poder desbloquear esta opción</h2>
            <button onClick={abrirModal}>Iniciar sesión</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
