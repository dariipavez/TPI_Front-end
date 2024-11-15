import React from 'react';
import { useRoute } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';

const RopaDeportiva = () => {
  const [match, params] = useRoute('/ropa-deportiva/:section');
  const section = params?.section;

  const renderContent = () => {
    switch (section) {
      case 'camisetas':
        return <p>Contenido de Camisetas</p>;
      case 'shorts':
        return <p>Contenido de Shorts</p>;
      case 'buzos':
        return <p>Contenido de Buzos</p>;
      default:
        return <p>Selecciona una categoría.</p>;
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Ropa Deportiva</h1>
      {renderContent()}
      <Footer />
    </div>
  );
};

export default RopaDeportiva;