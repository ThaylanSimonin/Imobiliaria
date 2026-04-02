import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

function Sidebar({ aberta, setAberta }) {

  return (

    <div className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 
      ${aberta ? "w-64" : "w-16"}`}>

      {/* TOPO */}
      <div className="flex items-center justify-between mb-8">

        {aberta && (
          <h1 className="text-2xl font-bold">
            Imobiliária
          </h1>
        )}

        <button
          onClick={() => setAberta(!aberta)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Menu size={20} />
        </button>

      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-4">

        <Link to="/" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          📊 {aberta && "Dashboard"}
        </Link>

        <Link to="/clientes" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          👤 {aberta && "Clientes"}
        </Link>

        <Link to="/imoveis" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          🏠 {aberta && "Imóveis"}
        </Link>

        <Link to="/relatorios/vendas" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          📄 {aberta && "Vendas"}
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;