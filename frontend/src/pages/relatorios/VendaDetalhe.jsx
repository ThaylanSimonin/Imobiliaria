import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VendaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venda, setVenda] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/api/vendas/${id}`)
      .then((res) => setVenda(res.data))
      .catch((err) => console.error("Erro ao buscar venda:", err));
  }, [id]);

  if (!venda) {
    return <p className="p-6">Carregando...</p>;
  }

  const imovel = venda.imovel_detalhes;
  const comprador = venda.cliente_detalhes;
  const proprietario = imovel?.cliente;

  return (
    <div className="p-8 max-w-5xl mx-auto">

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/relatorios/vendas")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ← Voltar
      </button>

      {/* HEADER */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Detalhes da Venda #{venda.id}
        </h1>

        <p className="text-gray-600">
          Data:{" "}
          {venda.data_venda
            ? new Date(venda.data_venda).toLocaleDateString("pt-BR")
            : "-"}
        </p>

        <p className="text-green-700 font-semibold text-xl mt-2">
          {venda.valor_venda?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* IMÓVEL */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Imóvel
          </h2>

          {imovel ? (
            <>
              <p><strong>Título:</strong> {imovel.titulo}</p>
              <p><strong>Tipo:</strong> {imovel.tipo}</p>
              <p><strong>Finalidade:</strong> {imovel.finalidade}</p>
              <p><strong>Status:</strong> {imovel.status}</p>

              <p className="mt-2">
                <strong>Endereço:</strong><br />
                {imovel.rua}, {imovel.numero} - {imovel.bairro}<br />
                {imovel.cidade} - {imovel.estado}
              </p>

              {imovel.complemento && (
                <p><strong>Complemento:</strong> {imovel.complemento}</p>
              )}

              <p className="mt-2">
                <strong>Valor:</strong>{" "}
                {imovel.valor?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>

              <p className="mt-3 text-gray-600">
                {imovel.descricao}
              </p>
            </>
          ) : (
            <p>Sem dados do imóvel</p>
          )}
        </div>

        {/* COMPRADOR */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Comprador
          </h2>

          {comprador ? (
            <>
              <p><strong>Nome:</strong> {comprador.nome}</p>
              <p><strong>Telefone:</strong> {comprador.telefone}</p>
              <p><strong>CPF:</strong> {comprador.cpf}</p>
            </>
          ) : (
            <p>Sem dados</p>
          )}
        </div>

        {/* PROPRIETÁRIO */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Proprietário
          </h2>

          {proprietario ? (
            <>
              <p><strong>Nome:</strong> {proprietario.nome}</p>
              <p><strong>Telefone:</strong> {proprietario.telefone}</p>
              <p><strong>CPF:</strong> {proprietario.cpf}</p>
            </>
          ) : (
            <p>Sem dados</p>
          )}
        </div>

        {/* CORRETOR */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Corretor
          </h2>

          <p className="text-gray-500">Sem registro</p>
        </div>

      </div>
    </div>
  );
}

export default VendaDetalhe;