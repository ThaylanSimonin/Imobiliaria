import React from "react";

export default function VendaModal({
  modalAberto,
  setModalAberto,
  cpfComprador,
  setCpfComprador,
  comprador,
  valorVenda,
  setValorVenda,
  confirmarVenda,
  imovelSelecionado
}) {

  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4">
          Registrar Venda
        </h2>

        <input
          type="text"
          placeholder="CPF do comprador"
          value={cpfComprador}
          onChange={(e) => setCpfComprador(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {comprador && (
          <p className="text-green-700 mb-3">
            Cliente encontrado: <b>{comprador.nome}</b>
          </p>
        )}

        {!comprador && cpfComprador.length >= 11 && (
          <p className="text-red-600 mb-3">
            Cliente não encontrado
          </p>
        )}

        <div className="mb-3">

          <label className="text-sm text-gray-600">
            Valor do imóvel
          </label>

          <p className="font-semibold">
            {imovelSelecionado?.valor?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>

        </div>

        <input
          type="number"
          placeholder="Valor da venda"
          value={valorVenda}
          onChange={(e) => setValorVenda(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={() => setModalAberto(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={confirmarVenda}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirmar Venda
          </button>

        </div>

      </div>

    </div>
  );
}