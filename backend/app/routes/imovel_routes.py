from flask import Blueprint, request, jsonify
from app.extensions import db  
from app.models.imovel import Imovel

imoveis_bp = Blueprint("imoveis", __name__)

# LISTAR
@imoveis_bp.route("/", methods=["GET"]) 
def listar_imoveis():

    imoveis = Imovel.query.all()

    resultado = []

    for imovel in imoveis:
        fotos = [foto.arquivo for foto in imovel.fotos] if hasattr(imovel, "fotos") else []

        resultado.append({
            **imovel.to_dict(),
            "fotos": fotos
        })

    return jsonify(resultado)


# CRIAR IMÓVEL 
@imoveis_bp.route("/", methods=["POST"]) 
def criar_imovel():

    data = request.form

    imovel = Imovel(
        titulo=data.get("titulo"),
        valor=data.get("valor"),
        tipo=data.get("tipo"),
        cep=data.get("cep"),
        estado=data.get("estado"),
        cidade=data.get("cidade"),
        bairro=data.get("bairro"),
        rua=data.get("rua"),
        numero=data.get("numero"),
        complemento=data.get("complemento"),
        descricao=data.get("descricao"),
        status=data.get("status"),
        cliente_id=data.get("cliente_id")
    )

    db.session.add(imovel)    
    db.session.commit()

    return jsonify(imovel.to_dict()), 201


# EDITAR
@imoveis_bp.route("/<int:id>", methods=["PUT"])  
def editar_imovel(id):

    imovel = Imovel.query.get_or_404(id)
    data = request.form

    imovel.titulo = data.get("titulo")
    imovel.valor = data.get("valor")
    imovel.tipo = data.get("tipo")
    imovel.cep = data.get("cep")
    imovel.estado = data.get("estado")
    imovel.cidade = data.get("cidade")
    imovel.bairro = data.get("bairro")
    imovel.rua = data.get("rua")
    imovel.numero = data.get("numero")
    imovel.complemento = data.get("complemento")
    imovel.descricao = data.get("descricao")
    imovel.status = data.get("status")

    db.session.commit()

    return jsonify(imovel.to_dict())

# BUSCAR IMÓVEL POR ID
@imoveis_bp.route("/<int:id>", methods=["GET"])
def buscar_imovel(id):

    imovel = Imovel.query.get_or_404(id)

    fotos = [foto.arquivo for foto in imovel.fotos] if hasattr(imovel, "fotos") else []

    return jsonify({
        **imovel.to_dict(),
        "fotos": fotos
    })

# EXCLUIR
@imoveis_bp.route("/<int:id>", methods=["DELETE"]) 
def deletar_imovel(id):

    imovel = Imovel.query.get_or_404(id)

    db.session.delete(imovel)
    db.session.commit()

    return "", 204