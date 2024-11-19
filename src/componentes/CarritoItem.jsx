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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>           
          <div className='flex w-2/5 justify-center'>
            <button className='hover:bg-gray-300 p-4 rounded-lg active:bg-gray-400'
              onMouseEnter={() => setBasura(true)}
              onMouseLeave={() => setBasura(false)}
              onClick={() => eliminarProd(producto.id, producto.talle)}
            >
              {basura ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
