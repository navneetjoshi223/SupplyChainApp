# SupplyChainApp
Project as part of take home assessment for Supply chain data hub Research Assistantship

# How to run:-
## BACKEND
### Install dependencies:
pip install -r requirements.txt

### Create and activate a virtual environment:
python -m venv venv


Navigate to /backend folder,
### Run commands:
source venv/bin/activate
python -m app.main

# Project Structure

SupplyChainApp/
│
├── backend/                  # Python backend code
│   ├── app/                  # Application code (Flask, FastAPI, Django)
│   │   ├── __init__.py
│   │   ├── main.py           # Entry point for the application
│   │   ├── routes/           # API routes
│   │   ├── models/           # Database models
│   │   ├── services/         # Business logic
│   │
│   ├── Dockerfile             # Dockerfile for backend
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables
│
│
├── frontend/                 # React frontend code
│   ├── public/               # Public static files
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/            # React pages
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point for the frontend
│   ├── Dockerfile             # Dockerfile for frontend
│   ├── package.json           # Node.js dependencies
│   ├── .env                  # Environment variables
│   └── README.md             # Frontend-specific documentation
│
├── docker-compose.yml        # Docker Compose configuration
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
