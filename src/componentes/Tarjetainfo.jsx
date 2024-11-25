import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import './TarjetaInfo.css';

const TarjetaInfo = () => {
  const [, navigate] = useLocation(); // Hook de navegación
  const [datosPerfil, setDatosPerfil] = useState({
    email: '',
    nombres: '',
    telefono: '',
    calle: '',
    numero: '',
    codigoPostal: '',
    ciudad: '',
    informacionAdicional: ''
  });

  useEffect(() => {
    const obtenerPerfil = () => {
      const usuario_id = sessionStorage.getItem('usuario_id');
      const token = sessionStorage.getItem('token');
      if (!usuario_id || !token) {
        console.error('No se encontró el ID de usuario o el token.');
        return;
      }

      const config = {
        headers: {
          Authorization: token
        }
      };
      const url = `http://localhost:3000/api/rutasUsuario/ver/perfil/${usuario_id}`;
      axios.get(url, config)
        .then((resp) => {
          if (resp.data.usuario) {
            const data = resp.data.usuario;
            setDatosPerfil({
              email: data.mail,
              nombres: data.nombre_completo.split(' ')[0],
              telefono: data.telefono,
              calle: data.calle || '',
              numero: data.numero || '',
              codigoPostal: data.codigo_postal || '',
              ciudad: data.ciudad || '',
              informacionAdicional: data.informacion_adicional || ''
            });
          } else {
            console.error('No se encontraron datos del usuario.');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            alert('No tienes permisos para ver el perfil. Verifica tu token de autenticación.');
          } else {
            console.error('Error al obtener los datos del perfil:', error);
          }
        });
    };

    obtenerPerfil();
  }, []);

  const finalizarCompra = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Verificar si todos los campos están completos
    const { email, nombres, telefono, calle, numero, codigoPostal, ciudad } = datosPerfil;
    if (!email || !nombres || !telefono || !calle || !numero || !codigoPostal || !ciudad) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const envioData = {
      id_usuario: sessionStorage.getItem('usuario_id'),
      codigo_postal: codigoPostal,
      calle: calle,
      numero: numero,
      ciudad: ciudad,
      informacion_adicional: datosPerfil.informacionAdicional
    };

    const token = sessionStorage.getItem('token');

    try {
      // Registrar el envío
      const envioResponse = await axios.post('http://localhost:3000/api/rutasUsuario/registrar/envio', envioData, {
        headers: {
          Authorization: token
        }
      });
      const id_envio = envioResponse.data.id_envio;

      // Obtener los productos del carrito
      const carrito = JSON.parse(localStorage.getItem(`carrito_${envioData.id_usuario}`)) || [];

      // Calcular el precio total
      let precioTotal = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

      // Datos de la compra
      const compraData = {
        precio_total: precioTotal, 
        id_envio: id_envio
      };

      // Registrar la compra
      const compraResponse = await axios.post('http://localhost:3000/api/rutasUsuario/registrar/compra', compraData, {
        headers: {
          Authorization: token
        }
      });
      const compra_id = compraResponse.data.compra_id;

      // Registrar cada producto de la compra
      for (const producto of carrito) {
        const productoCompraData = {
          id_producto: producto.id, // Asume que cada producto en el carrito tiene un id
          id_compra: compra_id,
          cantidad: producto.cantidad,
          precio_unitario: producto.precio
        };
        await axios.post('http://localhost:3000/api/rutasUsuario/registrar/producto_compra', productoCompraData, {
          headers: {
            Authorization: token
          }
        });
      }

      alert('Datos de envío y compra cargados correctamente.');
      console.log('Compra registrada:', compraResponse.data);

      // Guardar la compra localmente y redirigir al agradecimiento
      const nuevaCompra = {
        ...envioData,
        email: email,
        nombres: nombres,
        telefono: telefono,
        carrito: carrito
      };

      const comprasGuardadas = JSON.parse(localStorage.getItem(`compras_${envioData.id_usuario}`)) || [];
      comprasGuardadas.push(nuevaCompra);
      localStorage.setItem(`compras_${envioData.id_usuario}`, JSON.stringify(comprasGuardadas));

      // Vaciar el carrito
      localStorage.setItem(`carrito_${envioData.id_usuario}`, JSON.stringify([]));

      // Redirige a la pantalla de agradecimiento
      navigate('/agradecimiento');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('No tienes permisos para realizar esta acción.');
      } else if (error.response && error.response.status === 500) {
        alert('Error interno del servidor. Por favor, intenta nuevamente.');
      } else {
        alert('Error al registrar los datos de envío. Por favor, intenta nuevamente.');
      }
      console.error('Error al registrar el envío:', error);
    }
  };

  const manejarInput = (e) => {
    const { name, value } = e.target;
    setDatosPerfil(prevState => ({
      ...prevState,
      [name]: value
    }));
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
            <input type="email" name="email" value={datosPerfil.email} onChange={manejarInput} placeholder="Ejemplo@correo.com" />
          </label>
          <div className="nombre-apellido">
            <label>
              Nombre
              <input type="text" name="nombres" value={datosPerfil.nombres} onChange={manejarInput} placeholder="Tus nombres" />
            </label>
            <label>
              Teléfono/Móvil
              <input type="text" name="telefono" value={datosPerfil.telefono} onChange={manejarInput} placeholder="Número de teléfono" />
            </label>
          </div>

          {/* Sección de Dirección */}
          <h2 className="tarjeta-info-titulo">
            <i className="info-icono">📍</i> Dirección
          </h2>
          <label>
            Código Postal
            <input type="text" name="codigoPostal" value={datosPerfil.codigoPostal} onChange={manejarInput} placeholder="Código Postal" />
          </label>
          <div className="calle-numero">
            <label>
              Calle
              <input type="text" name="calle" value={datosPerfil.calle} onChange={manejarInput} placeholder="Calle" />
            </label>
            <label>
              Número
              <input type="text" name="numero" value={datosPerfil.numero} onChange={manejarInput} placeholder="Número" />
            </label>
          </div>
          <label>
            Información Adicional
            <input type="text" name="informacionAdicional" value={datosPerfil.informacionAdicional} onChange={manejarInput} placeholder="Información Adicional" />
          </label>
          <label>
            Ciudad
            <input type="text" name="ciudad" value={datosPerfil.ciudad} onChange={manejarInput} placeholder="Ciudad" />
          </label>

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

  