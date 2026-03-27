import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function FaturamentoMensalChart() {

  const [dados, setDados] = useState([]);
  const [ano, setAno] = useState(new Date().getFullYear());

  const meses = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ];

  useEffect(() => {

    fetch(`http://localhost:5300/api/dashboard/faturamento-mensal?ano=${ano}`)
      .then(res => res.json())
      .then(data => {

        const dadosFormatados = meses.map((mes, index) => {

          const registro = data.find(d => d.mes === index + 1);

          return {
            mes: mes,
            faturamento: registro ? registro.total : 0
          };

        });

        setDados(dadosFormatados);

      });

  }, [ano]);

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between mb-4">

        <h2 className="font-semibold">
          Faturamento por mês
        </h2>

        <select
          value={ano}
          onChange={(e) => setAno(Number(e.target.value))}
          className="border rounded p-1"
        >
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
        </select>

      </div>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={dados}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mes" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })
            }
          />

          <Bar
            dataKey="faturamento"
            fill="#2563eb"
            radius={[6,6,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default FaturamentoMensalChart;