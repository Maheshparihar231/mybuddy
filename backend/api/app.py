from flask import Flask
from flask_cors import CORS
from models import db
from routes import bp as api_bp
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)  # Enable CORS for all routes

    with app.app_context():
        db.create_all()  # Create database tables

    app.register_blueprint(api_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
