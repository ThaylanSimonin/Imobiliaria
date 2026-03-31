from app import db

class Imovel(db.Model):
    __tablename__ = "imoveis"
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    finalidade = db.Column(db.String(20))
    cep = db.Column(db.String(10))
    estado = db.Column(db.String(2))
    cidade = db.Column(db.String(100))
    bairro = db.Column(db.String(100))
    rua = db.Column(db.String(200))
    numero = db.Column(db.String(10))
    complemento = db.Column(db.String(200))
    valor = db.Column(db.Float, nullable=False)
    tipo = db.Column(db.String(50))
    descricao = db.Column(db.Text)
    status = db.Column(db.String(20), default="disponivel")
    cliente_id = db.Column(db.Integer, db.ForeignKey("clientes.id"))
    
    vendas = db.relationship("Venda", backref="imovel_rel", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "finalidade": self.finalidade,
            "valor": self.valor,
            "cep": self.cep,
            "estado": self.estado,
            "cidade": self.cidade,
            "bairro": self.bairro,
            "rua": self.rua,
            "numero": self.numero,
            "complemento": self.complemento,
            "tipo": self.tipo,
            "descricao": self.descricao,
            "status": self.status,
            "cliente": self.cliente.to_dict() if self.cliente else None
        }