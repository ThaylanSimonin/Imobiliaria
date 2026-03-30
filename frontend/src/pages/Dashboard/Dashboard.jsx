import React, { useEffect, useState } from "react";
import axios from "axios";

import FaturamentoMensalChart from "../../components/dashboard/FaturamentoMensalChart";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {

  const [imoveis, setImoveis] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {

    const imoveisRes = await axios.get("http://localhost:5100/api/imoveis");
    const clientesRes = await axios.get("http://localhost:5100/api/clientes");

    setImoveis(imoveisRes.data);
    setClientes(clientesRes.data);
  }

  /* KPIs */

  const totalImoveis = imoveis.length;

  const imoveisVendidos = imoveis.filter(i => i.status === "vendido").length;

  const imoveisDisponiveis = imoveis.filter(i => i.status === "disponivel").length;

  const totalVendas = imoveis
    .filter(i => i.status === "vendido")
    .reduce((acc, i) => acc + Number(i.valor || 0), 0);

  const valorDisponiveis = imoveis
    .filter(i => i.status === "disponivel")
    .reduce((acc, i) => acc + Number(i.valor || 0), 0);

  /* COMISSÃO POTENCIAL */

  const comissaoMax = imoveis
    .filter(i => i.status === "disponivel")
    .reduce((acc, imovel) => acc + Number(imovel.valor || 0) * 0.06, 0);

   const comissaoMin = imoveis
    .filter(i => i.status === "disponivel")
    .reduce((acc, imovel) => acc + Number(imovel.valor || 0) * 0.03, 0);

  const comissaoData = [
    {
      nome: "Comissão",
      max: comissaoMax,
      min: comissaoMin
    }
  ];

  /* STATUS DOS IMÓVEIS */

  const statusData = [
    {
      name: "Disponível",
      value: imoveisDisponiveis
    },
    {
      name: "Vendido",
      value: imoveisVendidos
    }
  ];

  const cores = ["#16a34a", "#dc2626"];

  return (

    <div className="p-8 space-y-10">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      {/* KPIs */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Total de Imóveis</p>
          <h2 className="text-3xl font-bold">{totalImoveis}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Disponíveis</p>
          <h2 className="text-3xl font-bold text-green-600">
            {imoveisDisponiveis}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Vendidos</p>
          <h2 className="text-3xl font-bold text-red-600">
            {imoveisVendidos}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Total em Vendas</p>
          <h2 className="text-2xl font-bold text-green-700">

            {totalVendas.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}

          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Valor disponível</p>
          <h2 className="text-xl font-bold text-blue-700">
            {valorDisponiveis.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
        </h2>
       </div>

      </div>

      {/* VENDAS MENSAIS */}

      <FaturamentoMensalChart />

      {/* GRÁFICOS */}

      <div className="grid grid-cols-2 gap-10">

        {/* COMISSÃO POTENCIAL */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="mb-4 font-semibold">
            Comissão Potencial
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={comissaoData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="nome" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="max"
                name="Comissão Máxima (6%)"
                fill="#2563eb"
              />

              <Bar
                dataKey="min"
                name="Comissão Mínima (3%)"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* STATUS */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="mb-4 font-semibold">
            Status dos Imóveis
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {statusData.map((entry, index) => (
                  <Cell key={index} fill={cores[index]} />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}