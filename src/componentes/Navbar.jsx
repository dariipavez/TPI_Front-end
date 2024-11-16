// src/components/Navbar.jsx
import React, { useState } from 'react';
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

  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');

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

  const manejarEnvioRegistro = (e) => {
    e.preventDefault();
    cerrarModalRegistro();
    navegar('/');
  };
  const loguearse = (datos) => {
    const url = "http://localhost:3000/api/usuario/login";
    axios.post(url, datos)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status === "ok") {
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario_id', resp.data.usuario_id);
          setToken(resp.data.token);
          setLogged(true);
          alert('Inicio de sesión exitoso');
        } else {
          alert('no se pudo conectar al servidor')
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Usuario/Contraseña incorrecta");
      });
  };

  const actualizar = (datos, usuario_id) => {
    if (token !== null) {
      const config = {
        headers: {
          authorization:  sessionStorage.getItem('token'),
        },
        params: { usuario_id,
        },

      };

      const url = `http://localhost:3000/api/usuario/actualizar/${usuario_id}`;
      axios.put(url, datos, config)
        .then((resp) => {
          console.log(resp.data);
          alert("Se actualizó correctamente");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Inicie sesión");
    }
  };

  const manejarCambioContraseña = (e) => {
    const { name, value } = e.target;
    if (name === "nuevaContraseña") {
      setNuevaContraseña(value);
    } else if (name === "confirmarContraseña") {
      setConfirmarContraseña(value);
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datos = {
      contraseña: nuevaContraseña,
    };
    const usuario_id = sessionStorage.getItem('usuario_id');
    actualizar(datos, usuario_id); 
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
        <span 
          className="icono-usuario" 
          onMouseEnter={() => setEsMenuPerfilAbierto(true)}
          onMouseLeave={() => setEsMenuPerfilAbierto(false)}
        >
          {esMenuPerfilAbierto && (
            <div className="profile-menu">
              <button className="profile-menu-item">Mi cuenta</button>
              <button className="profile-menu-item">Cerrar sesión</button>
            </div>
          )}
        </span>

        <span className="icono-usuario" onClick={abrirModal}>👤</span>
        <span className="icono-carrito" onClick={abrirModalCarrito}>🛒</span>
      </div>

      {/* Modales */}
      {esModalAbierto && (
        <div className="modal-overlay">
        <div className="modal-contenido">
          <form onSubmit={(e) => { e.preventDefault(); loguearse({ nombre_usuario: user, contraseña: pass, token}); }}>
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
          <p><a href="#" onClick={abrirModalContraseña}>¿Olvidó su contraseña?</a></p>
          <p>¿No tiene una cuenta? <a href="#" onClick={abrirModalRegistro}>Regístrese</a></p>
        </div>
      </div>
      )}

      {esModalCarritoAbierto && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            <button className="modal-close" onClick={cerrarModalCarrito}>X</button>
            <h2>Carro de compras</h2>
            <div className="carrito-producto">
              <img src="puma_suede_xl.jpg" alt="Puma Suede XL" className="carrito-producto-imagen" />
              <div className="carrito-producto-info">
                <h3>Puma Suede XL</h3>
                <p>$65.000</p>
              </div>
            </div>
            <button className="boton-continuar-compra" onClick={() => navegar('/confirmacion')}>Continuar compra</button>
          </div>
        </div>
      )}

      {esModalRegistroAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setEsModalRegistroAbierto(false); setEsModalAbierto(true); }}>Volver</button>
            <form onSubmit={manejarEnvioRegistro}>
              <button className="modal-close" onClick={cerrarModalRegistro}>X</button>
              <h2>Únete a nosotros</h2>
              <input className='modal-input' type="text" placeholder="Nombre completo" required />
              <input type="date" placeholder="Fecha de nacimiento" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input className='modal-input' type="text" placeholder="Nombre de usuario" required />
              <input type="password" placeholder="Contraseña" required />
              <input type="password" placeholder="Confirmar contraseña" required />
              <button type="submit" className="modal-submit-dark">Crear</button>
            </form>
          </div>
        </div>
      )}

      {esModalContraseñaAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-back" onClick={() => { setEsModalContraseñaAbierto(false); setEsModalAbierto(true); }}>Volver</button>
            <form onSubmit={manejarSubmit}>
              <button className="modal-close" onClick={cerrarModalContraseña}>X</button>
              <h2>Cambiar Contraseña</h2>
              <input
                type="password"
                name="nuevaContraseña"
                placeholder="Nueva contraseña"
                required
                value={nuevaContraseña}
                onChange={manejarCambioContraseña}
              />
              <input
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar nueva contraseña"
                required
                value={confirmarContraseña}
                onChange={manejarCambioContraseña}
              />
              <button type="submit" className="modal-submit-dark">Confirmar</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;