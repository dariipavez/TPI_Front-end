import React from 'react';

const ModalCarritoBloqueado = ({ isOpen, onClose, abrirModalLogin }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>Inicia sesión para poder desbloquear esta opción</h2>
          <button onClick={abrirModalLogin}>Iniciar sesión</button>
        </div>
      </div>
    )
  );
};

export default ModalCarritoBloqueado;