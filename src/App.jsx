// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import TarjetaDetalle from './componentes/Tarjetadetalle';
import TarjetaInfo from './componentes/Tarjetainfo';
import Tarjetaconfirmacion from './componentes/Tarjetaconfirmacion';
import Agradecimiento from './componentes/Agradecimiento';
import Agregar from './componentes/Agregar';
import Perfil from './componentes/Perfil';
import RopaUrbana from './componentes/RopaUrbana';
import RopaDeportiva from './componentes/RopaDeportiva';
import Usuarios from './componentes/Usuarios';
import Carrito from './componentes/Carrito';  // Importa el componente Carrito
import Compras from './componentes/Compras';
import { Router, Route } from "wouter";
import Productos from './componentes/Productos';
function App() {
  const [busqueda, setBusqueda] = useState('');

  const manejarBusqueda = (consulta) => {
    setBusqueda(consulta);
  };

  return (
    <div className="App"> 
      <Router>
        <Route path="/">
          <Menu busqueda={busqueda} onBuscar={manejarBusqueda} />
        </Route>

        <Route path="/detalle/:productId" component={({ params }) => <TarjetaDetalle id={params.productId} />} />
        <Route path="/confirmacion" component={Tarjetaconfirmacion} />
        <Route path="/info" component={TarjetaInfo} />
        <Route path="/agradecimiento" component={Agradecimiento} />
        <Route path="/agregar" component={Agregar} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/ropa-urbana/:section?" component={RopaUrbana} />
        <Route path="/ropa-deportiva/:section?" component={RopaDeportiva} />
        <Route path="/usuarios" component={Usuarios} />  {/* Ruta para Usuarios */}
        <Route path="/carrito" component={Carrito} />  {/* Ruta para Carrito */}
        <Route path="/compras" component={Compras} /> 
        <Route path="/productos" component={Productos} />
      </Router>
    </div>
  );
}

export default App;
