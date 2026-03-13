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

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Imóveis
        </h1>

        <Link
          to="/imoveis/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Imóvel
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Valor</th>
            <th className="p-3 text-left">Bairro</th>
            <th className="p-3 text-left">Proprietário</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>

          {imoveis.map((imovel) => (
            <tr key={imovel.id} className="border-t">

              <td className="p-3">{imovel.id}</td>

              <td className="p-3">{imovel.titulo}</td>

              <td className="p-3">
                {imovel.valor?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>

              <td className="p-3">
                {imovel.bairro} - {imovel.cidade}
              </td>

              <td className="p-3">
                {imovel.cliente?.nome || "Sem proprietário"}
              </td>

              <td className="p-3">
                {imovel.status === "vendido" ? (
                  <span className="text-red-600 font-semibold">
                    Vendido
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold">
                    Disponível
                  </span>
                )}
              </td>

              <td className="p-3 flex gap-2">

                <Link
                  to={`/imoveis/editar/${imovel.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </Link>

                <button
                  onClick={() => abrirModal(imovel)}
                  disabled={imovel.status === "vendido"}
                  className={`px-3 py-1 rounded text-white ${
                    imovel.status === "vendido"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                >
                  Vender
                </button>

                <button
                  onClick={() => abrirModalExcluir(imovel)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>

                <button
                  onClick={() => navigate(`/imoveis/${imovel.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Visualizar
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>


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

      {(notificacao || notificacaoLocal) && (
        <div
          className={`fixed top-5 right-5 px-6 py-4 rounded shadow-lg text-white
          ${(notificacao || notificacaoLocal).tipo === "sucesso"
            ? "bg-green-600"
            : "bg-red-600"}`}
        >
          {(notificacao || notificacaoLocal).mensagem}
        </div>
      )}

    </div>
  );
}

export default ImoveisList;