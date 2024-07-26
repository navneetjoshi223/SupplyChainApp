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

