from flask import Flask
import logging
from flasgger import Swagger

def create_app():
    app = Flask(__name__)

    # Set up logging
    logging.basicConfig(filename='app.log', level=logging.INFO,
                        format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
    app.logger.setLevel(logging.INFO)

    # Set up Swagger
    swagger = Swagger(app)

    from .routes import main
    app.register_blueprint(main)

    return app