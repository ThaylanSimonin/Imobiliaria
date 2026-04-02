from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.venda import Venda
from app.models.imovel import Imovel
from app.models.cliente import Cliente
from sqlalchemy.orm import joinedload

venda_bp = Blueprint("vendas", __name__)


# LISTAR VENDAS
@venda_bp.route("/", methods=["GET"])
def listar_vendas():
    vendas = Venda.query.options(
        joinedload(Venda.imovel),
        joinedload(Venda.cliente)
    ).all()
    return jsonify([v.to_dict() for v in vendas])


# CRIAR VENDA
@venda_bp.route("/", methods=["POST"])
def criar_venda():

    if not request.json:
        return jsonify({"erro": "Dados inválidos"}), 400

    data = request.json

    imovel = Imovel.query.get(data.get("imovel_id"))

    if not imovel:
        return jsonify({"erro": "Imóvel não encontrado"}), 404

    if imovel.status == "vendido":
        return jsonify({"erro": "Imóvel já vendido"}), 400

    cliente = Cliente.query.get(data.get("cliente_id"))

    if not cliente:
        return jsonify({"erro": "Cliente não encontrado"}), 404

    venda = Venda(
      imovel_id=data.get("imovel_id"),
      cliente_id=data.get("cliente_id"),
      imovel_nome=imovel.titulo,
      cliente_nome=cliente.nome,
      valor_venda=data.get("valor_venda")
    )

    # alterar status
    if imovel.finalidade == "aluguel":
      imovel.status = "alugado"
    else:
      imovel.status = "vendido"

    db.session.add(venda)
    db.session.commit()

    return jsonify(venda.to_dict()), 201

@venda_bp.route("/<int:id>", methods=["GET"])
def buscar_venda(id):
    venda = Venda.query.options(
        joinedload(Venda.imovel),
        joinedload(Venda.cliente)
    ).get_or_404(id)

    return jsonify(venda.to_dict())