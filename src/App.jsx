import React from 'react';
import './App.css';
import PáginaPrincipal from './componentes/Principal';
import TarjetaDetalle from './componentes/Tarjetadetalle';
import TarjetaInfo from './componentes/Tarjetainfo';
import Tarjetaconfirmacion from './componentes/Tarjetaconfirmacion';
import Agradecimiento from './componentes/Agradecimiento';
import Agregar from './componentes/Agregar';
import Perfil from './componentes/Perfil';
import RopaUrbana from './componentes/RopaUrbana';
import RopaDeportiva from './componentes/RopaDeportiva';
import Usuarios from './componentes/Usuarios';
import Carrito from './componentes/Carrito';
import Compras from './componentes/Compras';
import { Router, Route } from "wouter";
import Productos from './componentes/Productos';
import './index.css'

function App() {
  return (
    <div className="App"> 
      <Router>
        <Route path="/">
          <PáginaPrincipal />
        </Route>

        <Route path="/detalle/:productId" component={({ params }) => <TarjetaDetalle id={params.productId} />} />
        <Route path="/confirmacion" component={Tarjetaconfirmacion} />
        <Route path="/info" component={TarjetaInfo} />
        <Route path="/agradecimiento" component={Agradecimiento} />
        <Route path="/agregar" component={Agregar} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/ropa-urbana/:section?" component={RopaUrbana} />
        <Route path="/ropa-deportiva/:section?" component={RopaDeportiva} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/carrito" component={Carrito} />
        <Route path="/compras" component={Compras} /> 
        <Route path="/productos" component={Productos} />
      </Router>
    </div>
  );
}

export default App;
