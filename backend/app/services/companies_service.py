import pandas as pd
import os

# Define the path to the CSV files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
companies_path = os.path.join(BASE_DIR, '..', '..', 'companies.csv')

# Load CSV data into DataFrames
companies_df = pd.read_csv(companies_path)

def get_all_companies():
    return companies_df.to_dict(orient='records')

def get_company_by_id(company_id):
    company = companies_df[companies_df['company_id'] == company_id]
    if company.empty:
        return None
    return company.to_dict(orient='records')[0]