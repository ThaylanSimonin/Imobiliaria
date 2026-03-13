import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">

      <h1 className="text-2xl font-bold mb-8">
        Imobiliária
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        <Link 
          to="/clientes" 
          className="hover:bg-gray-700 p-2 rounded"
        >
          Clientes
        </Link>

        <Link 
          to="/imoveis" 
          className="hover:bg-gray-700 p-2 rounded"
        >
          Imóveis
        </Link>

        <Link 
          to="/relatorios/vendas" 
          className="hover:bg-gray-700 p-2 rounded"
        >
          Relatórios de Vendas
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;