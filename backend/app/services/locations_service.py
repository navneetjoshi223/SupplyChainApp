import pandas as pd
import os

# Define the path to the CSV files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
locations_path = os.path.join(BASE_DIR, '..', '..', 'locations.csv')

# Load CSV data into DataFrames
locations_df = pd.read_csv(locations_path)

def get_locations_by_company_id(company_id):
    locations = locations_df[locations_df['company_id'] == company_id]
    if locations.empty:
        return None
    return locations.to_dict(orient='records')