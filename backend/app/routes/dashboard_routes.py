from flask import Blueprint, jsonify, request
from app.models.imovel import Imovel
from app.models.cliente import Cliente
from app.models.venda import Venda
from app.extensions import db  
from sqlalchemy import extract, func
from datetime import datetime 

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/faturamento-mensal", methods=["GET"])
def faturamento_mensal():

    ano = request.args.get("ano", type=int)

    if not ano:
        ano = datetime.now().year

    resultado = (
        db.session.query(
            extract("month", Venda.data_venda).label("mes"),
            func.sum(Venda.valor_venda).label("total")
        )
        .filter(extract("year", Venda.data_venda) == ano)
        .group_by(extract("month", Venda.data_venda))
        .order_by(extract("month", Venda.data_venda))
        .all()
    )

    return jsonify([
        {
            "mes": int(r.mes),
            "total": float(r.total or 0)
        }
        for r in resultado
    ])


@dashboard_bp.route("/resumo", methods=["GET"])
def resumo():

    total_imoveis = Imovel.query.count()
    total_clientes = Cliente.query.count()
    total_vendas = Venda.query.count()

    total_valor_imoveis = db.session.query(func.sum(Imovel.valor)).scalar() or 0

    return jsonify({
        "total_imoveis": total_imoveis,
        "total_clientes": total_clientes,
        "total_vendas": total_vendas,
        "total_valor_imoveis": total_valor_imoveis
    })


@dashboard_bp.route("/vendas-mensais", methods=["GET"])
def vendas_mensais():

    ano = request.args.get("ano", type=int)

    if not ano:
        ano = datetime.now().year

    resultado = (
        db.session.query(
            extract("month", Venda.data_venda).label("mes"),
            func.count(Venda.id).label("total")
        )
        .filter(extract("year", Venda.data_venda) == ano)
        .group_by(extract("month", Venda.data_venda))
        .order_by(extract("month", Venda.data_venda))
        .all()
    )

    return jsonify([
        {"mes": int(r.mes), "total": int(r.total)}
        for r in resultado
    ])