#!/bin/bash

echo "================================="
echo " Iniciando Sistema Imobiliária "
echo "================================="

echo "Iniciando backend..."

cd backend || exit
source venv/bin/activate
python run.py &

cd ..

echo "Iniciando frontend..."

cd frontend || exit
npm run dev