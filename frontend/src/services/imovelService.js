import api from "./api";

export const listarImoveis = async () => {
  const response = await api.get("/imoveis/");
  return response.data;
};

export const buscarImovel = async (id) => {
  const response = await api.get(`/imoveis/${id}`);
  return response.data;
};

export const criarImovel = async (formData) => {
  const response = await api.post("/imoveis/", formData, {headers: {"Content-Type": "multipart/form-data"}});
  return response.data;
};

export const atualizarImovel = async (id, formData) => {
  const response = await api.put(`/imoveis/${id}`, formData, {headers: {"Content-Type": "multipart/form-data"}});
  return response.data;
};

export const deletarImovel = async (id) => {
  await api.delete(`/imoveis/${id}`);
};