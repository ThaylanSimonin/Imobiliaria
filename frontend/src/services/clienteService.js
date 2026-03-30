import api from "./api";

export const listarClientes = () => api.get("/clientes");
export const buscarCliente = (id) => api.get(`/clientes/${id}`);
export const criarCliente = (cliente) => api.post("/clientes", cliente);
export const atualizarCliente = (id, cliente) => api.put(`/clientes/${id}`, cliente);
export const deletarCliente = (id) => api.delete(`/clientes/${id}`);
export const buscarClientePorCpf = (cpf) => api.get(`/clientes/cpf/${cpf}`);