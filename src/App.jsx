// App.jsx
import React from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle'; // Importa Detalle
import { Router, Route } from "wouter"; // Importa Router y Route de wouter

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Menu} />
        <Route path="/detalle/:productId" component={Detalle} />
      </Router>
    </div>
  );
}

export default App;

