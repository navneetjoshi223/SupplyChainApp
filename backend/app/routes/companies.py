from flask import Blueprint
from app.controllers.companies_controller import get_companies, get_company

companies_bp = Blueprint('companies', __name__)

companies_bp.route('/api/companies', methods=['GET'])(get_companies)