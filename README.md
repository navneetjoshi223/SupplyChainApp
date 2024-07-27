# SupplyChainApp
Project as part of take home assessment for Supply chain data hub Research Assistantship. The application has backend APIs written in Python using Flask, a frontend with a two-page structure coded in React and map integration. It is containerized using Docker.

# How to run:-

## BACKEND (Python)
### Install dependencies:
pip install -r requirements.txt

### Create and activate a virtual environment:
python -m venv venv


Navigate to /backend folder,
### Run commands:
source venv/bin/activate
python -m app.main

## FRONTEND (React)

### Navigate to /frontend directory
cd frontend

### Install dependencies:
npm install

### Create Environment Configuration
Create a .env file in the frontend directory with the following content to set the API URL:
    REACT_APP_API_URL=http://127.0.0.1:5000/api
This URL should point to the running instance of your Flask backend.

### Start the React Development Server
npm start
