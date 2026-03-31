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

      <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        background: "#fff"
        }}>

      <button
        onClick={() => navigate("/imoveis")}
        style={{
        marginBottom: "20px",
        background: "#1976d2",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
      >
        ← Voltar
      </button>

      <h1 style={{ marginBottom: "5px" }}>{imovel.titulo}</h1>

      <h2 style={{ color: "#2e7d32", marginTop: "0" }}>
        R$ {imovel.valor}
      </h2>

      <span style={{
        background: "#e8f5e9",
        color: "#2e7d32",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "14px"
        }}>
        {imovel.status}
       </span>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px",
        marginTop: "30px"
        }}>

        {/* DADOS DO IMÓVEL */}
        <div>

          <h3>Informações do Imóvel</h3>

          <p><strong>Tipo:</strong> {imovel.tipo}</p>
          <p><strong>Status:</strong> {imovel.status}</p>

          <p><strong>Modalidade:</strong> {imovel.finalidade}</p>

          <p>
           <strong>Endereço:</strong>
            {imovel.rua}, {imovel.numero} - {imovel.bairro}, {imovel.cidade} - {imovel.estado}
          </p>

          {imovel.complemento && (
            <p><strong>Complemento:</strong> {imovel.complemento}</p>
          )}

          <div style={{ marginTop: "25px" }}>

           <h3>Descrição</h3>

          <p style={{ lineHeight: "1.6", color: "#555" }}>
          {imovel.descricao}
          </p>

        </div>

        </div>

        {/* PROPRIETÁRIO */}
       {imovel.cliente && (

      <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        background: "#fafafa",
        height: "fit-content"
      }}>

      <h3>Proprietário</h3>

      <p><strong>Nome:</strong> {imovel.cliente.nome}</p>
      <p><strong>Telefone:</strong> {imovel.cliente.telefone}</p>
      <p><strong>CPF:</strong> {imovel.cliente.cpf}</p>

      </div>

       )}

      </div>

    </div>

  )
}

export default ImovelDetalhe