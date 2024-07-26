from flask import jsonify, abort, current_app
from flasgger import swag_from
from app.services.locations_service import get_locations_by_company_id

@swag_from('../swagger/get_locations.yml')
def get_locations(company_id):
    try:
        locations = get_locations_by_company_id(company_id)
        if locations is None:
            abort(404, description="No locations found for this company")
        return jsonify(locations)
    except KeyError as e:
        current_app.logger.error(f"Key error: {str(e)}")
        abort(400, description="Bad Request")
    except Exception as e:
        current_app.logger.error(f"Error fetching locations: {str(e)}")
        abort(500, description="Internal Server Error")