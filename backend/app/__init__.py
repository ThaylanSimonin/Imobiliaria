from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///imobiliaria.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    CORS(app, origins=["http://localhost:5200"])
    
    from app.routes.imovel_routes import imoveis_bp
    from app.routes.clientes_routes import cliente_bp
    from app.routes.vendas_routes import venda_bp
    from app.routes.dashboard_routes import dashboard_bp
    

    app.register_blueprint(imoveis_bp, url_prefix="/api/imoveis")
    app.register_blueprint(cliente_bp, url_prefix="/api/clientes")
    app.register_blueprint(venda_bp, url_prefix="/api/vendas")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    
    from app.models.imovel import Imovel
    from app.models.cliente import Cliente
    from app.models.venda import Venda
    
    with app.app_context():
     db.create_all()

    return app