import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function ImovelDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [imovel, setImovel] = useState(null)

  useEffect(() => {

    axios.get(`http://localhost:5100/api/imoveis/${id}`)
      .then(res => {
        setImovel(res.data)
      })
      .catch(err => {
        console.error("Erro ao buscar imóvel:", err)
      })

  }, [id])

  if (!imovel) {
    return <p>Carregando...</p>
  }

  return (

      <div className="p-8 max-w-5xl mx-auto">

  {/* VOLTAR */}
  <button
    onClick={() => navigate("/imoveis")}
    className="mb-6 text-blue-600 hover:underline"
  >
    ← Voltar
  </button>

  {/* HEADER */}
  <div className="bg-white shadow rounded-xl p-6 mb-6">

    <h1 className="text-3xl font-bold">{imovel.titulo}</h1>

    <div className="flex items-center justify-between mt-3">

      <p className="text-2xl font-semibold text-green-600">
        {imovel.valor?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
      </p>

      {/* STATUS */}
      <span className={`px-3 py-1 rounded-full text-sm font-semibold
        ${
          imovel.status === "disponivel"
            ? "bg-green-100 text-green-700"
            : imovel.status === "vendido"
            ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {imovel.status}
      </span>

    </div>

    {/* FINALIDADE */}
    <div className="mt-3">
      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
        {imovel.finalidade}
      </span>
    </div>

  </div>

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* INFO PRINCIPAL */}
    <div className="md:col-span-2 bg-white shadow rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Informações do Imóvel
      </h2>

      <div className="space-y-2 text-gray-700">

        <p><strong>Tipo:</strong> {imovel.tipo}</p>

        <p>
          <strong>Endereço:</strong><br />
          {imovel.rua}, {imovel.numero}<br />
          {imovel.bairro} - {imovel.cidade}/{imovel.estado}
        </p>

        {imovel.complemento && (
          <p><strong>Complemento:</strong> {imovel.complemento}</p>
        )}

      </div>

      {/* DESCRIÇÃO */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Descrição</h3>
        <p className="text-gray-600 leading-relaxed">
          {imovel.descricao}
        </p>
      </div>

    </div>

    {/* PROPRIETÁRIO */}
    {imovel.cliente && (
      <div className="bg-white shadow rounded-xl p-6 h-fit">

        <h2 className="text-xl font-semibold mb-4">
          Proprietário
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Nome:</strong> {imovel.cliente.nome}</p>
          <p><strong>Telefone:</strong> {imovel.cliente.telefone}</p>
          <p><strong>CPF:</strong> {imovel.cliente.cpf}</p>
        </div>

      </div>
    )}

  </div>

</div>

  )
}

export default ImovelDetalhe