from flask import Flask
from config import Config
from app.extensions import db, cors
import os
import pathlib

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.url_map.strict_slashes = False

    # Inicializar extensões
    db.init_app(app)
    cors.init_app(app)

    # Upload folder
    BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
    UPLOAD_FOLDER = BASE_DIR / "uploads" / "imoveis"

    app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # IMPORTAR ROTAS
    from app.routes.imovel_routes import imoveis_bp
    from app.routes.clientes_routes import cliente_bp
    from app.routes.vendas_routes import venda_bp
    from app.routes.dashboard_routes import dashboard_bp

    # REGISTRAR ROTAS
    app.register_blueprint(imoveis_bp, url_prefix="/api/imoveis")
    app.register_blueprint(cliente_bp, url_prefix="/api/clientes")
    app.register_blueprint(venda_bp, url_prefix="/api/vendas")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    # Criar banco
    with app.app_context():
        db.create_all()

    return app