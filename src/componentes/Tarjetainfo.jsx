// src/components/TarjetaInfo.jsx
import React from 'react';
import { useLocation } from 'wouter';
import './TarjetaInfo.css';

const TarjetaInfo = () => {
  const [, navigate] = useLocation(); // Hook de navegación

  const finalizarCompra = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    navigate('/agradecimiento'); // Redirige a la pantalla de agradecimiento
  };

  return (
    <div className="tarjeta-info-contenedor">
      <div className="tarjeta-info">
        <h2 className="tarjeta-info-titulo">
          <i className="info-icono">ℹ️</i> Identificación
        </h2>
        <form className="tarjeta-info-formulario">
          {/* Sección de Identificación */}
          <label>
            Correo Electrónico
            <input type="email" placeholder="Ejemplo@correo.com" />
          </label>
          <div className="nombre-apellido">
            <label>
              Nombres
              <input type="text" placeholder="Tus nombres" />
            </label>
            <label>
              Apellidos
              <input type="text" placeholder="Tus apellidos" />
            </label>
          </div>
          <div className="dni-telefono">
            <label>
              DNI
              <input type="text" placeholder="Número de DNI" />
            </label>
            <label>
              Teléfono/Móvil
              <input type="text" placeholder="Número de teléfono" />
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
            <input type="text" placeholder="Código Postal" />
          </label>
          <div className="calle-numero">
            <label>
              Calle
              <input type="text" placeholder="Calle" />
            </label>
            <label>
              Número
              <input type="text" placeholder="Número" />
            </label>
          </div>
          <label>
            Información Adicional
            <input type="text" placeholder="Información Adicional" />
          </label>
          <label>
            Ciudad
            <input type="text" placeholder="Ciudad" />
          </label>
          <label>
            Destinatario
            <input type="text" placeholder="Destinatario" />
          </label>
          <label>
            Método de entrega
            <select>
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
            <input type="text" placeholder="Número de la tarjeta" />
          </label>
          <label>
            Cuotas disponibles:
            <select>
              <option>¿En cuántas cuotas deseas pagar?</option>
              <option value="1">1 Cuota</option>
              <option value="3">3 Cuotas</option>
              <option value="6">6 Cuotas</option>
              <option value="12">12 Cuotas</option>
            </select>
          </label>
          <label>
            Nombre y apellido como figura en la tarjeta
            <input type="text" placeholder="Nombre y Apellido" />
          </label>
          <div className="fecha-codigo">
            <label>
              Fecha de vencimiento
              <div className="fecha-vencimiento">
                <input type="text" placeholder="MM" maxLength="2" />
                <span>/</span>
                <input type="text" placeholder="AA" maxLength="2" />
              </div>
            </label>
            <label>
              Código de seguridad
              <input type="text" placeholder="CVV" maxLength="3" />
            </label>
          </div>

          {/* Botón Finalizar Compra */}
          <button type="button" className="boton-finalizar" onClick={finalizarCompra}>
            Finalizar Compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default TarjetaInfo;