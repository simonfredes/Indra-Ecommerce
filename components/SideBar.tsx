// components/Sidebar.tsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 shadow-lg">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Categorías</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">Blusas (3)</a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">Remeras (25)</a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">Pantalones (8)</a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">Camperas (5)</a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">Abrigos (3)</a>
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Color</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-900">Azul Francia (1)</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-900">Blanco (3)</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-900">Bordo (3)</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-900">Camel (3)</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-900">Chocolate (3)</a>
            </li>
            {/* Agrega más colores según sea necesario */}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Precio</h3>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Desde" 
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Hasta" 
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
