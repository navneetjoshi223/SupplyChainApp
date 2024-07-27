from flask import Flask
from flask_cors import CORS
import logging
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])
    
    # Set up logging
    logging.basicConfig(filename='app.log', level=logging.INFO,
                        format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
    app.logger.setLevel(logging.INFO)

    # Set up Swagger
    swagger = Swagger(app)

    # Register routes
    from app.routes.companies import companies_bp
    from app.routes.company_details import company_details_bp
    from app.routes.locations import locations_bp

    app.register_blueprint(companies_bp)
    app.register_blueprint(company_details_bp)
    app.register_blueprint(locations_bp)

    return app