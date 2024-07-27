import unittest
from flask_testing import TestCase
from app import create_app

class BaseTestCase(TestCase):
    def create_app(self):
        # Create the Flask application configured for testing
        app = create_app()
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        return app

    def setUp(self):
        # Setup to run before each test
        pass

    def tearDown(self):
        # Cleanup to run after each test
        pass