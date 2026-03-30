import React, { useState, useEffect } from "react";
import { criarImovel, buscarImovel, atualizarImovel } from "../../services/imovelService";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { 
  formatarCEP
} from "../../utils/validators";

export default function ImovelForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [cep, setCep] = useState("")
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [descricao, setDescricao] = useState("");

  const [cpf, setCpf] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteId, setClienteId] = useState(null);

  const [erros, setErros] = useState({});

  useEffect(() => {

    if (!id) return;

    const carregarImovel = async () => {
      try {

        const imovel = await buscarImovel(id);

        setTitulo(imovel.titulo || "");
        setValor(imovel.valor || "");
        setTipo(imovel.tipo || "");
        setCep(imovel.cep || "");
        setEstado(imovel.estado || "");
        setCidade(imovel.cidade || "");
        setBairro(imovel.bairro || "");
        setRua(imovel.rua || "");
        setNumero(imovel.numero || "");
        setComplemento(imovel.complemento || "");
        setDescricao(imovel.descricao || "");

        if (imovel.cliente_id) {
          setClienteId(imovel.cliente_id);
          setClienteNome(imovel.cliente_nome || "");
        }

      } catch (erro) {
        console.error("Erro ao carregar imóvel:", erro);
      }
    };

    carregarImovel();

  }, [id]);


  const buscarCliente = async () => {

    if (!cpf) return;

    try {

      const response = await api.get(`/clientes/cpf/${cpf}`);

      setClienteNome(response.data.nome);
      setClienteId(response.data.id);

      setErros((prev) => ({ ...prev, cliente: null }));

    } catch {

      setErros((prev) => ({
        ...prev,
        cliente: "Cliente não encontrado"
      }));

      setClienteNome("");
      setClienteId(null);

    }

  };


  const buscarCep = async () => {

    if (!cep || cep.length < 8) return;

    try {

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {

        setErros((prev) => ({
          ...prev,
          cep: "CEP não encontrado"
        }));

        return;
      }

      setEstado(data.uf || "");
      setCidade(data.localidade || "");
      setBairro(data.bairro || "");
      setRua(data.logradouro || "");

    } catch (erro) {

      console.error("Erro ao buscar CEP:", erro);

    }

  };



  const salvar = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("valor", valor);
    formData.append("tipo", tipo);
    formData.append("cep", cep);
    formData.append("estado", estado);
    formData.append("cidade", cidade);
    formData.append("bairro", bairro);
    formData.append("rua", rua);
    formData.append("numero", numero);
    formData.append("complemento", complemento);
    formData.append("descricao", descricao);
    formData.append("cliente_id", clienteId);


    try {

      if (id) {
        await atualizarImovel(id, formData);
      } else {
        await criarImovel(formData);
      }

      navigate("/imoveis");

    } catch (erro) {

      console.error("Erro ao salvar imóvel:", erro);

    }

  };


  return (

    <div className="p-8 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        {id ? "Editar Imóvel" : "Cadastrar Imóvel"}
      </h1>

      <form onSubmit={salvar} className="space-y-4">

        <input
          type="text"
          placeholder="Título do imóvel"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          min="0"
          className="border p-3 w-full rounded"
        />

        <input
          type="text"
          placeholder="Tipo (Casa, Apartamento...)"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(formatarCEP(e.target.value))}
          onBlur={buscarCep}
          className="border p-2 w-full"
        />

        <input
          placeholder="Estado"
          value={estado}
          onChange={(e)=>setEstado(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Cidade"
          value={cidade}
          onChange={(e)=>setCidade(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Bairro"
          value={bairro}
          onChange={(e)=>setBairro(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Rua"
          value={rua}
          onChange={(e)=>setRua(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Número"
          value={numero}
          onChange={(e)=>setNumero(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Complemento"
          value={complemento}
          onChange={(e)=>setComplemento(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-3 w-full rounded"
        />

        {/* PROPRIETÁRIO */}

        <div className="border p-4 rounded bg-gray-50">

          <h2 className="font-semibold mb-2">
            Proprietário
          </h2>

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="CPF do cliente"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="border p-2 flex-1 rounded"
            />

            <button
              type="button"
              onClick={buscarCliente}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Buscar
            </button>

          </div>

          {erros.cliente && (
            <p className="text-red-500 text-sm mt-1">
              {erros.cliente}
            </p>
          )}

          {clienteNome && (

            <p className="mt-2 text-green-700">
              Cliente encontrado: <b>{clienteNome}</b>
            </p>

          )}

        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Salvar Imóvel
        </button>

      </form>

    </div>

  );
}