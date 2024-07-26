from flask import Flask
import logging

def create_app():
    app = Flask(__name__)

    # Set up logging
    logging.basicConfig(filename='app.log', level=logging.INFO,
                        format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
    app.logger.setLevel(logging.INFO)

    from .routes import main
    app.register_blueprint(main)

    return app