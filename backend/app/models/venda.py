from app import db
from datetime import date


class Venda(db.Model):
    
    __tablename__ = "vendas"

    id = db.Column(db.Integer, primary_key=True)

    imovel_id = db.Column(db.Integer, db.ForeignKey("imoveis.id"))
    cliente_id = db.Column(db.Integer, db.ForeignKey("clientes.id"))
    
    imovel_nome = db.Column(db.String(150))
    cliente_nome = db.Column(db.String(150))
    
    status = db.Column(db.String(50), default="disponivel")

    valor_venda = db.Column(db.Float)
    
    data_venda = db.Column(db.Date, default=date.today)
    
    imovel = db.relationship("Imovel",  back_populates="vendas")
    cliente = db.relationship("Cliente")

    def to_dict(self):
        return {
            "id": self.id,
            "imovel_id": self.imovel_id,
            "cliente_id": self.cliente_id,
            "imovel": self.imovel_nome,
            "comprador": self.cliente_nome,
            "valor_venda": self.valor_venda,
            "data_venda": self.data_venda.isoformat() if self.data_venda else None,
            "imovel_detalhes": self.imovel.to_dict() if self.imovel else None,
            "cliente_detalhes": self.cliente.to_dict() if self.cliente else None
        }