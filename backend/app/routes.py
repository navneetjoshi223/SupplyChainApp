from flask import Blueprint, jsonify, abort, current_app
import pandas as pd

main = Blueprint('main', __name__)

# Load CSV data into DataFrames
companies_df = pd.read_csv('./companies.csv')
locations_df = pd.read_csv('./locations.csv')

# Print column names for debugging
print("Companies DataFrame columns:", companies_df.columns)
print("Locations DataFrame columns:", locations_df.columns)

@main.route('/api/companies', methods=['GET'])
def get_companies():
    try:
        companies = companies_df.to_dict(orient='records')
        return jsonify(companies)
    except Exception as e:
        current_app.logger.error(f"Error fetching companies: {str(e)}")
        abort(500, description="Internal Server Error")

@main.route('/api/companies/<int:company_id>', methods=['GET'])
def get_company_by_id(company_id):
    try:
        company = companies_df[companies_df['company_id'] == company_id]
        if company.empty:
            abort(404, description="Company not found")
        return jsonify(company.to_dict(orient='records')[0])
    except KeyError as e:
        current_app.logger.error(f"Key error: {str(e)}")
        abort(400, description="Bad Request")
    except Exception as e:
        current_app.logger.error(f"Error fetching company by ID: {str(e)}")
        abort(500, description="Internal Server Error")

@main.route('/api/companies/<int:company_id>/locations', methods=['GET'])
def get_company_locations(company_id):
    try:
        locations = locations_df[locations_df['company_id'] == company_id]
        if locations.empty:
            abort(404, description="No locations found for this company")
        return jsonify(locations.to_dict(orient='records'))
    except KeyError as e:
        current_app.logger.error(f"Key error: {str(e)}")
        abort(400, description="Bad Request")
    except Exception as e:
        current_app.logger.error(f"Error fetching locations: {str(e)}")
        abort(500, description="Internal Server Error")


@main.errorhandler(404)
def resource_not_found(e):
    current_app.logger.warning(f"404 error: {str(e)}")
    return jsonify(error=str(e)), 404

@main.errorhandler(500)
def internal_server_error(e):
    current_app.logger.error(f"500 error: {str(e)}")
    return jsonify(error=str(e)), 500

@main.errorhandler(400)
def bad_request(e):
    current_app.logger.warning(f"400 error: {str(e)}")
    return jsonify(error=str(e)), 400