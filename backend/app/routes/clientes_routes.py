from flask import Blueprint, request, jsonify
from app import db
from app.models.cliente import Cliente
import re

cliente_bp = Blueprint("clientes", __name__)

# LISTAR
@cliente_bp.route("", methods=["GET"])
@cliente_bp.route("/", methods=["GET"])
def listar_clientes():
    clientes = Cliente.query.all()
    return jsonify([c.to_dict() for c in clientes])


# BUSCAR POR ID
@cliente_bp.route("/<int:id>", methods=["GET"])
def buscar_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    return jsonify(cliente.to_dict())


# BUSCAR POR CPF
@cliente_bp.route("/buscar-por-cpf/<cpf>", methods=["GET"])
def buscar_por_cpf(cpf):

    cpf = re.sub(r"\D", "", cpf)

    cliente = Cliente.query.filter_by(cpf=cpf).first()

    if not cliente:
        return jsonify({"erro": "Cliente não encontrado"}), 404

    return jsonify({
        "id": cliente.id,
        "nome": cliente.nome,
        "cpf": cliente.cpf
    })


# CRIAR
@cliente_bp.route("", methods=["POST"])
@cliente_bp.route("/", methods=["POST"])
def criar_cliente():

    data = request.json

    import re
    cpf = re.sub(r"\D", "", data.get("cpf"))

    cliente = Cliente(
        nome=data["nome"],
        email=data.get("email"),
        telefone=data.get("telefone"),
        perfil=data.get("perfil"),
        cpf=cpf
    )

    db.session.add(cliente)
    db.session.commit()

    return jsonify(cliente.to_dict()), 201


# ATUALIZAR
@cliente_bp.route("/<int:id>", methods=["PUT"])
def atualizar_cliente(id):

    cliente = Cliente.query.get_or_404(id)
    data = request.json

    cliente.nome = data["nome"]
    cliente.email = data.get("email")
    cliente.telefone = data.get("telefone")
    cliente.perfil = data.get("perfil")
    cliente.cpf = re.sub(r"\D", "", data.get("cpf"))

    db.session.commit()

    return jsonify(cliente.to_dict())


# DELETAR
@cliente_bp.route("/<int:id>", methods=["DELETE"])
def deletar_cliente(id):

    cliente = Cliente.query.get_or_404(id)

    db.session.delete(cliente)
    db.session.commit()

    return "", 204