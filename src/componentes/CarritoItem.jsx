import React, { useEffect, useState } from 'react';

export default function CarritoItem({ producto, eliminarProd, setUnidCarrito }) {
  const [basura, setBasura] = useState(false);

  function validacionInput(valorInput) {
    if (/^[0-9]*$/.test(valorInput)) {
      if (valorInput === '' || valorInput === '0') setUnidCarrito(producto.id, "");
      else if (parseInt(valorInput) > parseInt(producto.stock)) setUnidCarrito(producto.id, producto.stock);
      else setUnidCarrito(producto.id, parseInt(valorInput));
    } 
  }

  function blurInput(valorInput) {
    if (valorInput === '' || valorInput === '0') setUnidCarrito(producto.id, parseInt(1));
  }

  useEffect(() => {
    setUnidCarrito(producto.id, producto.unidades);
  }, [producto.unidades]);

  return (
    <div className="space-y-4 p-6 first:rounded-t-lg last:rounded-b-lg">
      <div className="flex gap-4 sm:gap-0 flex-row flex-wrap items-center px-6 py-4">
        <div className='flex flex-row items-center w-full sm:w-3/5'>
          <div className="flex justify-center w-2/5">
            <div className="w-16 h-16 bg-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col sm:flex-row w-3/5 gap-3 justify-center text-center sm:justify-evenly">
            <p className="font-bold text-xl">{producto.nombre}</p>
            <p className="font-bold text-xl">$ {producto.precio * producto.unidades}</p>
          </div>
        </div>
        <div className="flex flex-row-reverse sm:flex-row justify-between items-center sm:w-2/5 w-full">
          <div className='flex flex-row justify-center gap-4 w-3/5'>
            <button 
              onClick={() => setUnidCarrito(producto.id, producto.unidades > 1 ? producto.unidades - 1 : 1)}
              disabled={producto.unidades === 1}
              className='disabled:text-slate-400'
            >
            </button>

            <input type="text"
              autoComplete="off"
              onChange={(e) => validacionInput(e.target.value)}
              value={producto.unidades}
              onBlur={(e) => blurInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur() }}
              className="w-12 text-center rounded"
            />

            <button
              onClick={() => setUnidCarrito(producto.id, producto.unidades < producto.stock ? producto.unidades + 1 : producto.stock)}
              disabled={producto.unidades === producto.stock}
              className='disabled:text-slate-400'
            >
              
            </button>
          </div>           
          <div className='flex w-2/5 justify-center'>
            <button className='hover:bg-gray-300 p-4 rounded-lg active:bg-gray-400'
              onMouseEnter={() => setBasura(true)}
              onMouseLeave={() => setBasura(false)}
              onClick={() => eliminarProd(producto.id, producto.talle)}
            >
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}