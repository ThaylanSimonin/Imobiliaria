from app import db

class Cliente(db.Model):
    __tablename__ = "clientes"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150))
    telefone = db.Column(db.String(20))
    perfil = db.Column(db.String(20))
    cpf = db.Column(db.String(14), unique=True)
    imoveis = db.relationship("Imovel", backref="cliente", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "telefone": self.telefone,
            "perfil": self.perfil,
            "cpf": self.cpf
        }