import React, { useEffect, useState } from "react";
import { listarVendas } from "../../services/vendaService";

function RelatorioVendas() {

  const [vendas, setVendas] = useState([]);

  async function carregarVendas() {

    try {

      const data = await listarVendas();
       console.log('Dados recebidos:', data);  // Veja a estrutura
       console.log('Campo "imovel" da primeira venda:', data[0]?.imovel);
      setVendas(data);

    } catch (erro) {

      console.error("Erro ao carregar vendas:", erro);

    }

  }

  useEffect(() => {
    carregarVendas();
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Relatório de Vendas
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Imóvel</th>
            <th className="p-3 text-left">Comprador</th>
            <th className="p-3 text-left">Valor</th>
            <th className="p-3 text-left">Data</th>

          </tr>

        </thead>

        <tbody>

          {vendas.map((venda) => (

            <tr key={venda.id} className="border-t">

              <td className="p-3">{venda.id}</td>

              <td className="p-3">
               {venda.imovel || `Imóvel #${venda.imovel_id}`}
              </td>

              <td className="p-3">{venda.comprador}</td>

              <td className="p-3">

                {Number(venda.valor_venda).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}

              </td>

              <td className="p-3">{venda.data_venda}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RelatorioVendas;