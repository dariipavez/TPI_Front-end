import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  // Si el modal no está abierto, no muestra nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">   
    <div className="modal-contenido">
        
        <form>
        {/* Botón para cerrar el modal */}
        <button className="modal-close" onClick={onClose}>
          X
        </button>
          
        <h2>Crea tu cuenta o inicia sesión para obtener beneficios exclusivos</h2>

          <input 
            type="email" 
            placeholder="Ej: Ejemplo@gmail.com" 
            className="modal-input"
          />
          <input 
            type="password" 
            placeholder="Ingrese su contraseña" 
            className="modal-input"
          />
          <button type="submit" className="modal-submit">
            Entrar
          </button>
        </form>
        
        <p>¿Olvidó su contraseña?</p>
        <p>¿No tiene una cuenta? <a href="#">Regístrese</a></p>
      </div>
    </div>
  );
};

export default Modal;
