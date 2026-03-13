import { useState, useEffect } from "react";
import { registrarVenda } from "../services/vendaService";
import { somenteNumeros } from "../utils/validators";
import { buscarClientePorCpf } from "../services/clienteService";

export default function useVendaImovel(carregarImoveis) {

  const [modalAberto, setModalAberto] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);

  const [cpfComprador, setCpfComprador] = useState("");
  const [comprador, setComprador] = useState(null);

  const [valorVenda, setValorVenda] = useState("");

  const [notificacao, setNotificacao] = useState(null);

  const abrirModal = (imovel) => {

    setImovelSelecionado(imovel);
    setModalAberto(true);

    setCpfComprador("");
    setComprador(null);

    setValorVenda(String(imovel.valor));
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

useEffect(() => {

  const buscarComprador = async () => {

    const cpfLimpo = somenteNumeros(cpfComprador);

    if (cpfLimpo.length !== 11) {
      setComprador(null);
      return;
    }

    try {

      const response = await buscarClientePorCpf(cpfLimpo);

      setComprador(response.data);

    } catch (error) {

      if (error.response?.status === 404) {
        setComprador(null);
      } else {
        console.error(error);
      }

    }

  };

  buscarComprador();

}, [cpfComprador]);

  const confirmarVenda = async () => {

    if (!comprador) {

      setNotificacao({
        tipo: "erro",
        mensagem: "Cliente não encontrado"
      });

      setTimeout(() => setNotificacao(null), 3000);
      return;
    }

    try {

      await registrarVenda({
        imovel_id: imovelSelecionado.id,
        cliente_id: comprador.id,
        valor_venda: valorVenda
      });

      setNotificacao({
        tipo: "sucesso",
        mensagem: "Venda registrada com sucesso!"
      });

      setTimeout(() => setNotificacao(null), 3000);

      setModalAberto(false);
      carregarImoveis();

    } catch (error) {

      console.error(error);

      setNotificacao({
        tipo: "erro",
        mensagem: "Erro ao registrar venda"
      });

      setTimeout(() => setNotificacao(null), 3000);

    }

  };

  return {
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
  };

}