import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendasList() {
  const [vendas, setVendas] = useState([]);
  const navigate = useNavigate();

  async function carregarVendas() {
    try {
      const response = await axios.get("http://localhost:5100/api/vendas/");
      setVendas(response.data);
    } catch (erro) {
      console.error("Erro ao carregar vendas:", erro);
    }
  }

  useEffect(() => {
    carregarVendas();
  }, []);

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Relatório de Vendas</h1>
      </div>

      {/* TABELA */}
      <table className="w-full bg-white shadow rounded overflow-hidden">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-center">ID</th>
            <th className="p-3 text-left">Imóvel</th>
            <th className="p-3 text-left">Comprador</th>
            <th className="p-3 text-left">Corretor</th>
            <th className="p-3 text-left">Valor</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id} className="border-t hover:bg-gray-50">

              {/* ID */}
              <td className="p-3 text-center">{venda.id}</td>

              {/* IMÓVEL */}
              <td className="p-3">
                {venda.imovel || "-"}
              </td>

              {/* COMPRADOR */}
              <td className="p-3">
                {venda.comprador || "-"}
              </td>

              {/* CORRETOR (FUTURO) */}
              <td className="p-3">
                {venda.corretor_nome || "Sem registro"}
              </td>

              {/* VALOR */}
              <td className="p-3">
                {venda.valor_venda?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>

              {/* DATA */}
              <td className="p-3">
                {venda.data_venda
                  ? new Date(venda.data_venda).toLocaleDateString("pt-BR")
                  : "-"}
              </td>

              {/* AÇÕES */}
              <td className="p-3 text-center">
                <button
                  onClick={() => navigate(`/vendas/${venda.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Detalhes
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* ESTADO VAZIO */}
      {vendas.length === 0 && (
        <p className="text-gray-500 mt-4">
          Nenhuma venda registrada.
        </p>
      )}

    </div>
  );
}

export default VendasList;