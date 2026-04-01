import React, { useEffect, useState } from "react";
import { listarImoveis, deletarImovel } from "../../services/imovelService";
import { Link, useNavigate } from "react-router-dom";
import VendaModal from "../../components/imoveis/VendaModal";
import useVendaImovel from "../../hooks/useVendaImovel";

function ImoveisList() {
  const navigate = useNavigate();

  const [imoveis, setImoveis] = useState([]);
  const [imovelParaExcluir, setImovelParaExcluir] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [notificacaoLocal, setNotificacaoLocal] = useState(null);

  async function carregarImoveis() {
    const data = await listarImoveis();
    setImoveis(data);
  }

  function abrirModalExcluir(imovel) {
    setImovelParaExcluir(imovel);
    setModalExcluirAberto(true);
  }

  function fecharModalExcluir() {
    setModalExcluirAberto(false);
    setImovelParaExcluir(null);
  }

  async function confirmarExclusao() {
    if (!imovelParaExcluir) return;

    try {
      await deletarImovel(imovelParaExcluir.id);

      setNotificacaoLocal({
        tipo: "sucesso",
        mensagem: "Imóvel excluído com sucesso"
      });

      setTimeout(() => setNotificacaoLocal(null), 3000);

      fecharModalExcluir();
      carregarImoveis();
    } catch (erro) {
      console.error("Erro ao excluir imóvel:", erro);

      setNotificacaoLocal({
        tipo: "erro",
        mensagem: "Erro ao excluir imóvel"
      });

      setTimeout(() => setNotificacaoLocal(null), 3000);
    }
  }

  useEffect(() => {
    carregarImoveis();
  }, []);

  const {
    modalAberto,
    cpfComprador,
    setCpfComprador,
    comprador,
    valorVenda,
    setValorVenda,
    confirmarVenda,
    abrirModal,
    fecharModal,
    imovelSelecionado,
    notificacao
  } = useVendaImovel(carregarImoveis);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Imóveis</h1>

        <Link
          to="/imoveis/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Imóvel
        </Link>
      </div>

      {/* TABELA */}
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-center">Modalidade</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Valor</th>
            <th className="p-3 text-left">Localização</th>
            <th className="p-3 text-left">Proprietário</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>
          {imoveis.map((imovel) => (
            <tr key={imovel.id} className="border-t hover:bg-gray-50">
              
              {/* MODALIDADE */}
              <td className="p-3 text-center">
                {imovel.finalidade
                  ? imovel.finalidade.charAt(0).toUpperCase() +
                    imovel.finalidade.slice(1)
                  : "-"}
              </td>

              {/* TÍTULO */}
              <td className="p-3">{imovel.titulo}</td>

              {/* VALOR */}
              <td className="p-3">
                {imovel.valor?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>

              {/* LOCALIZAÇÃO */}
              <td className="p-3">
                {imovel.bairro}
              </td>

              {/* PROPRIETÁRIO */}
              <td className="p-3">
                {imovel.cliente?.nome || "Sem proprietário"}
              </td>

              {/* STATUS */}
              <td className="p-3 text-center">
                {imovel.status === "vendido" ? (
                  <span className="text-red-600 font-semibold">
                    Vendido
                  </span>
                ) : imovel.status === "alugado" ? (
                  <span className="text-blue-600 font-semibold">
                    Alugado
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold">
                    Disponível
                  </span>
                )}
              </td>

              {/* AÇÕES */}
              <td className="p-3 flex gap-2">
                <Link
                  to={`/imoveis/editar/${imovel.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>

                <button
                  onClick={() => abrirModal(imovel)}
                  disabled={imovel.status !== "disponivel"}
                  className={`px-3 py-1 rounded text-white ${
                    imovel.status !== "disponivel"
                      ? "bg-gray-400 cursor-not-allowed"
                      : imovel.finalidade === "aluguel"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {imovel.status !== "disponivel"
                    ? "Negociado"
                    : imovel.finalidade === "aluguel"
                    ? "Alugar"
                    : "Vender"}
                </button>

                <button
                  onClick={() => abrirModalExcluir(imovel)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Excluir
                </button>

                <button
                  onClick={() => navigate(`/imoveis/${imovel.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL VENDA */}
      <VendaModal
        modalAberto={modalAberto}
        setModalAberto={fecharModal}
        cpfComprador={cpfComprador}
        setCpfComprador={setCpfComprador}
        comprador={comprador}
        valorVenda={valorVenda}
        setValorVenda={setValorVenda}
        confirmarVenda={confirmarVenda}
        imovelSelecionado={imovelSelecionado}
      />

      {/* MODAL EXCLUSÃO */}
      {modalExcluirAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Confirmar exclusão
            </h2>

            <p className="mb-6">
              Deseja realmente excluir o imóvel
              <b> {imovelParaExcluir?.titulo}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={fecharModalExcluir}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarExclusao}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICAÇÃO */}
      {(notificacao || notificacaoLocal) && (
        <div
          className={`fixed top-5 right-5 px-6 py-4 rounded shadow-lg text-white ${
            (notificacao || notificacaoLocal).tipo === "sucesso"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {(notificacao || notificacaoLocal).mensagem}
        </div>
      )}
    </div>
  );
}

export default ImoveisList;