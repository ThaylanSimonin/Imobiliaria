# Sistema de Gestão Imobiliária Versão 1.0

Aplicação fullstack para gerenciamento de imóveis e proprietários.

## 📌 Funcionalidades

* Cadastro de imóveis
* Listagem de imóveis
* Visualização de detalhes do imóvel
* Cadastro de proprietários
* API REST para gerenciamento de dados

## 🧰 Tecnologias

### Backend

* Python
* Flask
* SQLAlchemy
* Flask-Migrate

### Frontend

* React
* Vite
* TailwindCSS
* Axios

## 📂 Estrutura do Projeto

imobiliaria/
│
├── backend/
│ ├── app/
│ ├── requirements.txt
│ └── run.py
│
└── frontend/
├── src/
├── package.json
└── vite.config.js

## 🚀 Como rodar o projeto

### Backend

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 run.py

Servidor rodará em:

http://localhost:5300

### Frontend

cd frontend
npm install
npm run dev

Aplicação rodará em:

http://localhost:5400
