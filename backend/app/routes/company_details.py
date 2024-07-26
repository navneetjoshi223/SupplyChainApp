from flask import Blueprint
from app.controllers.companies_controller import get_company

company_details_bp = Blueprint('company_details', __name__)

company_details_bp.route('/api/companies/<int:company_id>', methods=['GET'])(get_company)