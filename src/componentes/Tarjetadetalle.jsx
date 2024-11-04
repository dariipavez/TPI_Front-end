 // TarjetaDetalle.jsx
 import React from 'react';
 import Boton from './Boton';
 import Marcador from './Marcador';
 import './TarjetaDetalle.css'; // Asegúrate de tener un archivo de estilos para personalizar la tarjeta.
 
 const TarjetaDetalle = () => {
   return (
     <div className="tarjeta-detalle">
       <div className="detalle-imagenes">
         {/* Aquí pueden ir varias imágenes del producto */}
         <div className="detalle-imagen">
           <img src="ruta_de_la_imagen_1" alt="Producto 1" />
         </div>
         <div className="detalle-imagen">
           <img src="ruta_de_la_imagen_2" alt="Producto 2" />
         </div>
         <div className="detalle-imagen">
           <img src="ruta_de_la_imagen_3" alt="Producto 3" />
         </div>
         <div className="detalle-imagen">
           <img src="ruta_de_la_imagen_4" alt="Producto 4" />
         </div>
       </div>
       
       <div className="detalle-info">
         <h2>Nombre del Producto</h2>
         <p>Descripción del producto...</p>
         <p>Precio: $XX.XXX</p>
         <p>Talle:</p>
 
         {/* Componente Marcador */}
         <Marcador />
 
         {/* Componente Botón */}
         <Boton texto="Agregar al carrito" onClick={() => alert('Producto agregado al carrito')} />
       </div>
     </div>
   );
 };
 
 export default TarjetaDetalle;