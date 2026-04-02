import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import ImoveisList from "./pages/Imoveis/ImoveisList";
import ImovelForm from "./pages/Imoveis/ImovelForm";
import ImovelDetalhe from "./pages/Imoveis/ImovelDetalhe";

import ClientesList from "./pages/Clientes/ClientesList";
import ClienteForm from "./pages/Clientes/ClienteForm";

import Dashboard from "./pages/Dashboard/Dashboard";

import RelatorioVendas from "./pages/relatorios/RelatorioVendas";
import VendaDetalhe from "./pages/relatorios/VendaDetalhe";

function App() {
  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/resumo" element={<Dashboard />} />

          <Route path="/imoveis" element={<ImoveisList />} />
          <Route path="/imoveis/novo" element={<ImovelForm />} />
          <Route path="/imoveis/editar/:id" element={<ImovelForm />} />
          <Route path="/imoveis/:id" element={<ImovelDetalhe />} />

          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/novo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />

          <Route path="/relatorios/vendas" element={<RelatorioVendas />} />
          <Route path="/vendas/:id" element={<VendaDetalhe />} />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}

export default App;