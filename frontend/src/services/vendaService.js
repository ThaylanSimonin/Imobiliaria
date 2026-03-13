import api from "./api";

export const registrarVenda = (dados) => {
  return api.post("/vendas/", dados);
};

export const listarVendas = async () => {

  const response = await api.get("/vendas/");

  return response.data;

};