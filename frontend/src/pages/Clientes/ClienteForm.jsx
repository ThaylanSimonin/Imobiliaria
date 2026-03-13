import React from "react";
import { useState, useEffect } from "react";
import { criarCliente, buscarCliente, atualizarCliente } from "../../services/clienteService";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatarCPF,
  formatarTelefone,
  validarNome,
  cpfValido,
  emailValido
} from "../../utils/validators";

export default function ClienteForm() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [perfil, setPerfil] = useState("");
  const [cpf, setCpf] = useState("");

  const [erros, setErros] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  const carregarCliente = async () => {
    try {

      const response = await buscarCliente(id);
      const cliente = response.data;

      setNome(cliente.nome || "");
      setEmail(cliente.email || "");
      setTelefone(cliente.telefone || "");
      setPerfil(cliente.perfil || "");
      setCpf(cliente.cpf || "");

    } catch (erro) {
      console.error("Erro ao carregar cliente:", erro);
    }
  };

  const salvar = async (e) => {

    e.preventDefault();

    const novosErros = {};

    if (!nome || nome.length < 3) {
      novosErros.nome = "Nome inválido";
    }

    if (!emailValido(email)) {
      novosErros.email = "Email inválido";
    }

    if (!telefone || telefone.length < 14) {
      novosErros.telefone = "Telefone inválido";
    }

    if (!cpfValido(cpf)) {
      novosErros.cpf = "CPF inválido";
    }

    if (!perfil) {
      novosErros.perfil = "Informe o perfil do cliente";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});

    const cliente = { nome, email, telefone, perfil, cpf };

    try {

      if (id) {
        await atualizarCliente(id, cliente);
      } else {
        await criarCliente(cliente);
      }

      navigate("/clientes");

    } catch (erro) {

      console.error("Erro ao salvar cliente:", erro);

      setErros((prev) => ({
        ...prev,
        geral: "Erro ao salvar cliente"
      }));

    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Cliente" : "Cadastrar Cliente"}
      </h1>

      <form onSubmit={salvar} className="space-y-4">

        {/* NOME */}

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => {
            setNome(validarNome(e.target.value));
            setErros((prev) => ({ ...prev, nome: null }));
          }}
          className="border p-2 w-full"
        />

        {erros.nome && (
          <p className="text-red-500 text-sm">{erros.nome}</p>
        )}

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErros((prev) => ({ ...prev, email: null }));
          }}
          className="border p-2 w-full"
        />

        {erros.email && (
          <p className="text-red-500 text-sm">{erros.email}</p>
        )}

        {/* TELEFONE */}

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => {
            setTelefone(formatarTelefone(e.target.value));
            setErros((prev) => ({ ...prev, telefone: null }));
          }}
          className="border p-2 w-full"
        />

        {erros.telefone && (
          <p className="text-red-500 text-sm">{erros.telefone}</p>
        )}

        {/* PERFIL */}

        <input
          type="text"
          placeholder="Perfil"
          value={perfil}
          onChange={(e) => {
            setPerfil(e.target.value);
            setErros((prev) => ({ ...prev, perfil: null }));
          }}
          className="border p-2 w-full"
        />

        {erros.perfil && (
          <p className="text-red-500 text-sm">{erros.perfil}</p>
        )}

        {/* CPF */}

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => {
            setCpf(formatarCPF(e.target.value));
            setErros((prev) => ({ ...prev, cpf: null }));
          }}
          className="border p-2 w-full"
        />

        {erros.cpf && (
          <p className="text-red-500 text-sm">{erros.cpf}</p>
        )}

        {/* ERRO GERAL */}

        {erros.geral && (
          <p className="text-red-600 text-sm">{erros.geral}</p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Salvar
        </button>

      </form>
    </div>
  );
}