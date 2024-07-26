from flask import jsonify, abort, current_app
from flasgger import swag_from
from app.services.companies_service import get_all_companies, get_company_by_id

@swag_from('../swagger/get_companies.yml')
def get_companies():
    try:
        companies = get_all_companies()
        return jsonify(companies)
    except Exception as e:
        current_app.logger.error(f"Error fetching companies: {str(e)}")
        abort(500, description="Internal Server Error")

@swag_from('../swagger/get_company.yml')
def get_company(company_id):
    try:
        company = get_company_by_id(company_id)
        if company is None:
            abort(404, description="Company not found")
        return jsonify(company)
    except KeyError as e:
        current_app.logger.error(f"Key error: {str(e)}")
        abort(400, description="Bad Request")
    except Exception as e:
        current_app.logger.error(f"Error fetching company by ID: {str(e)}")
        abort(500, description="Internal Server Error")