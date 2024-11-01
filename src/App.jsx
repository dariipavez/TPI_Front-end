import React from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle'; // Importar el componente Detalle
import { Router, Route } from "wouter"; // Importar Router y Route de wouter

function App() {
  return (
    <Router>
      <div className="App">
        {/* Ruta principal que muestra el Menu */}
        <Route path="/" component={Menu} />

        {/* Ruta para la pantalla de detalles */}
        <Route path="/detalle/:productId" component={Detalle} />
      </div>
    </Router>
  );
}

export default App;

