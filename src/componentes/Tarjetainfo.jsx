// src/components/TarjetaInfo.jsx
import React from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import './TarjetaInfo.css';

const TarjetaInfo = () => {
  const [, navigate] = useLocation(); // Hook de navegación

  const finalizarCompra = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Obtener los datos del formulario
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const nombres = formData.get('nombres');
    const apellidos = formData.get('apellidos');
    const dni = formData.get('dni');
    const telefono = formData.get('telefono');
    const calle = formData.get('calle');
    const numero = formData.get('numero');
    const codigoPostal = formData.get('codigoPostal');
    const ciudad = formData.get('ciudad');
    const destinatario = formData.get('destinatario');
    const metodoEntrega = formData.get('metodoEntrega');
    const metodoPago = formData.get('metodoPago');

    const usuarioId = sessionStorage.getItem('usuario_id');
    const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];

    const nuevaCompra = {
      email,
      nombres,
      apellidos,
      dni,
      telefono,
      calle,
      numero,
      codigoPostal,
      ciudad,
      destinatario,
      metodoEntrega,
      metodoPago,
      carrito
    };

    const comprasGuardadas = JSON.parse(localStorage.getItem(`compras_${usuarioId}`)) || [];
    comprasGuardadas.push(nuevaCompra);
    localStorage.setItem(`compras_${usuarioId}`, JSON.stringify(comprasGuardadas));

    // Vaciar el carrito
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify([]));

    // Redirige a la pantalla de agradecimiento
    navigate('/agradecimiento');
  };

  return (
    <div className="tarjeta-info-contenedor">
      <Navbar />
      <div className="tarjeta-info">
        <h2 className="tarjeta-info-titulo">
          <i className="info-icono">ℹ️</i> Identificación
        </h2>
        <form className="tarjeta-info-formulario" onSubmit={finalizarCompra}>
          {/* Sección de Identificación */}
          <label>
            Correo Electrónico
            <input type="email" name="email" placeholder="Ejemplo@correo.com" />
          </label>
          <div className="nombre-apellido">
            <label>
              Nombres
              <input type="text" name="nombres" placeholder="Tus nombres" />
            </label>
            <label>
              Apellidos
              <input type="text" name="apellidos" placeholder="Tus apellidos" />
            </label>
          </div>
          <div className="dni-telefono">
            <label>
              DNI
              <input type="text" name="dni" placeholder="Número de DNI" />
            </label>
            <label>
              Teléfono/Móvil
              <input type="text" name="telefono" placeholder="Número de teléfono" />
            </label>
          </div>

          {/* Botón para continuar a dirección */}
          <button type="button" className="boton-continuar">
            Continuar a Dirección
          </button>

          {/* Sección de Dirección */}
          <h2 className="tarjeta-info-titulo">
            <i className="info-icono">📍</i> Dirección
          </h2>
          <label>
            Código Postal
            <input type="text" name="codigoPostal" placeholder="Código Postal" />
          </label>
          <div className="calle-numero">
            <label>
              Calle
              <input type="text" name="calle" placeholder="Calle" />
            </label>
            <label>
              Número
              <input type="text" name="numero" placeholder="Número" />
            </label>
          </div>
          <label>
            Información Adicional
            <input type="text" name="informacionAdicional" placeholder="Información Adicional" />
          </label>
          <label>
            Ciudad
            <input type="text" name="ciudad" placeholder="Ciudad" />
          </label>
          <label>
            Destinatario
            <input type="text" name="destinatario" placeholder="Destinatario" />
          </label>
          <label>
            Método de entrega
            <select name="metodoEntrega">
              <option value="andreani">Andreani</option>
              <option value="correo-argentino">Correo Argentino</option>
              <option value="oca">Oca</option>
            </select>
          </label>

          {/* Botón para continuar a método de pago */}
          <button type="submit" className="boton-continuar">
            Continuar a Método de pago
          </button>

          {/* Nueva Sección de Pago */}
          <h2 className="tarjeta-info-titulo">
            <i className="info-icono">💳</i> Pago
          </h2>
          <div className="tipo-tarjeta">
            <button type="button">Tarjeta de Crédito</button>
            <button type="button">Tarjeta de Débito</button>
          </div>
          <label>
            Número
            <input type="text" name="numeroTarjeta" placeholder="Número de la tarjeta" />
          </label>
          <label>
            Cuotas disponibles:
            <select name="cuotas">
              <option>¿En cuántas cuotas deseas pagar?</option>
              <option value="1">1 Cuota</option>
              <option value="3">3 Cuotas</option>
              <option value="6">6 Cuotas</option>
              <option value="12">12 Cuotas</option>
            </select>
          </label>
          <label>
            Nombre y apellido como figura en la tarjeta
            <input type="text" name="nombreTarjeta" placeholder="Nombre y Apellido" />
          </label>
          <div className="fecha-codigo">
            <label>
              Fecha de vencimiento
              <div className="fecha-vencimiento">
                <input type="text" name="mesVencimiento" placeholder="MM" maxLength="2" />
                <span>/</span>
                <input type="text" name="anioVencimiento" placeholder="AA" maxLength="2" />
              </div>
            </label>
            <label>
              Código de seguridad
              <input type="text" name="cvv" placeholder="CVV" maxLength="3" />
            </label>
          </div>

          {/* Botón Finalizar Compra */}
          <button type="submit" className="boton-finalizar">
            Finalizar Compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default TarjetaInfo;
