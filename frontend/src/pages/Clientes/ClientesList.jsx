import React, { useEffect, useState } from "react";
import { listarClientes, deletarCliente } from "../../services/clienteService";
import { Link } from "react-router-dom";

function ClientesList() {

  const [clientes, setClientes] = useState([]);

  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [notificacao, setNotificacao] = useState(null);

  async function carregarClientes() {
    try {
      const response = await listarClientes();
      console.log("Resposta da API:", response.data);
      setClientes(response.data);
    } catch (erro) {
      console.error("Erro ao carregar clientes:", erro);
      setClientes([]);
    }
  }

  function abrirModalExcluir(cliente) {
    setClienteParaExcluir(cliente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setClienteParaExcluir(null);
  }

  async function confirmarExclusao() {
    if (!clienteParaExcluir) return;

    try {

      await deletarCliente(clienteParaExcluir.id);

      setNotificacao({
        tipo: "sucesso",
        mensagem: "Cliente excluído com sucesso"
      });

      setTimeout(() => setNotificacao(null), 3000);

      fecharModal();
      carregarClientes();

    } catch (erro) {

      console.error("Erro ao excluir cliente:", erro);

      setNotificacao({
        tipo: "erro",
        mensagem: "Erro ao excluir cliente"
      });

      setTimeout(() => setNotificacao(null), 3000);

    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div>

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Clientes
        </h1>

        <Link
          to="/clientes/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Cliente
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Telefone</th>
            <th className="p-3 text-left">Perfil</th>
            <th className="p-3 text-left">CPF</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>

          {clientes?.map((cliente) => (
            <tr key={cliente.id} className="border-t">

              <td className="p-3">{cliente.id}</td>
              <td className="p-3">{cliente.nome}</td>
              <td className="p-3">{cliente.email}</td>
              <td className="p-3">{cliente.telefone}</td>
              <td className="p-3">{cliente.perfil}</td>
              <td className="p-3">{cliente.cpf}</td>

              <td className="p-3 flex gap-2">

                <Link
                  to={`/clientes/editar/${cliente.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>

                <button
                  onClick={() => abrirModalExcluir(cliente)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Excluir
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* MODAL DE CONFIRMAÇÃO */}

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded shadow-lg w-96">

            <h2 className="text-lg font-bold mb-4">
              Confirmar exclusão
            </h2>

            <p className="mb-6">
              Deseja realmente excluir o cliente{" "}
              <b>{clienteParaExcluir?.nome}</b>?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={fecharModal}
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

      {notificacao && (
        <div
          className={`fixed top-5 right-5 px-6 py-4 rounded shadow-lg text-white
          ${notificacao.tipo === "sucesso" ? "bg-green-600" : "bg-red-600"}`}
        >
          {notificacao.mensagem}
        </div>
      )}

    </div>
  );
}

export default ClientesList;