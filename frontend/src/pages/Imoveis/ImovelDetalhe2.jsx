import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function ImovelDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [imovel, setImovel] = useState(null)

  useEffect(() => {

    axios.get(`http://localhost:5300/api/imoveis/${id}`)
      .then(res => setImovel(res.data))
      .catch(err => console.error(err))

  }, [id])

  if (!imovel) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* BOTÃO VOLTAR */}

      <button
        className="btn btn-outline"
        onClick={() => navigate("/imoveis")}
      >
        ← Voltar
      </button>


      {/* HEADER */}

      <div className="space-y-2">

        <h1 className="text-3xl font-bold">
          {imovel.titulo}
        </h1>

        <div className="flex items-center gap-4">

          <span className="text-2xl font-semibold text-success">
            R$ {imovel.valor}
          </span>

          <div className="badge badge-success">
            {imovel.status}
          </div>

        </div>

      </div>


      {/* GRID PRINCIPAL */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* INFORMAÇÕES DO IMÓVEL */}

        <div className="md:col-span-2">

          <div className="card bg-base-100 shadow-xl">

            <div className="card-body">

              <h2 className="card-title">
                Informações do Imóvel
              </h2>

              <div className="space-y-2 mt-4">

                <p>
                  <strong>Tipo:</strong> {imovel.tipo}
                </p>

                <p>
                  <strong>Endereço:</strong>
                  {" "}
                  {imovel.rua}, {imovel.numero} - {imovel.bairro}
                </p>

                <p>
                  {imovel.cidade} - {imovel.estado}
                </p>

                {imovel.complemento && (
                  <p>
                    <strong>Complemento:</strong> {imovel.complemento}
                  </p>
                )}

              </div>

              <div className="divider"></div>

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  Descrição
                </h3>

                <p className="text-gray-600">
                  {imovel.descricao}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* PROPRIETÁRIO */}

        {imovel.cliente && (

          <div>

            <div className="card bg-base-100 shadow-xl">

              <div className="card-body">

                <h2 className="card-title">
                  Proprietário
                </h2>

                <div className="space-y-2 mt-4">

                  <p>
                    <strong>Nome:</strong> {imovel.cliente.nome}
                  </p>

                  <p>
                    <strong>Telefone:</strong> {imovel.cliente.telefone}
                  </p>

                  <p>
                    <strong>CPF:</strong> {imovel.cliente.cpf}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  )

}

export default ImovelDetalhe