from flask import Blueprint
from app.controllers.locations_controller import get_locations

locations_bp = Blueprint('locations', __name__)

locations_bp.route('/api/companies/<int:company_id>/locations', methods=['GET'])(get_locations)