from flask import Flask
from config import Config
from app import db, cors
import pathlib
import os

from app.routes.imovel_routes import imoveis_bp
from app.routes.clientes_routes import clientes_bp
from app.routes.dashboard_routes import dashboard_bp  # IMPORTAR

def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)

    app.url_map.strict_slashes = False

    db.init_app(app)
    cors.init_app(app)

    BASE_DIR = pathlib.Path(__file__).resolve().parent.parent

    UPLOAD_FOLDER = BASE_DIR / "uploads" / "imoveis"

    app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)

    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    print("UPLOAD_FOLDER:", app.config["UPLOAD_FOLDER"])
    print("Arquivos:", os.listdir(app.config["UPLOAD_FOLDER"]))

    # ROTAS
    app.register_blueprint(imoveis_bp, url_prefix="/api/imoveis")
    app.register_blueprint(clientes_bp, url_prefix="/api/clientes")
    app.register_blueprint(dashboard_bp)  # REGISTRAR

    with app.app_context():
        db.create_all()

    return app