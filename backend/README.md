# SupplyChainApp API Documentation

## Base URL
http://127.0.0.1:5000/api

## Endpoints

### 1. Get All Companies

**Endpoint:** `/companies`

**Method:** `GET`

**Description:** Retrieves a list of all companies.

**Response:**

- **Status Code:** `200 OK`
- **Content:**

  ```json
  [
    {
        "address": "Address of company 1",
        "company_id": 3,
        "latitude": 25.7617,
        "longitude": -80.1918,
        "name": "Company name 1"
    },
    {
        "address": "Address of company 2",
        "company_id": 3,
        "latitude": 25.7617,
        "longitude": -80.1918,
        "name": "Company name 2"
    }
  ]

**Example Request**
curl http://127.0.0.1:5000/api/companies


### 2. Get Company Details by ID

**Endpoint:** `/companies/<int:company_id>`

**Method:** `GET`

**Description:** Retrieves details of a specific company by ID.

**Path Parameters:**

	company_id (int): The ID of the company to retrieve.

**Response:**

- **Status Code:** `200 OK`
- **Content:**

  ```json
  {
    "address": "Address of company",
    "company_id": 3,
    "latitude": 25.7617,
    "longitude": -80.1918,
    "name": "Company name"
  }


### 3. Get All Locations for a Specific Company ID

**Endpoint:** `/companies/<int:company_id>/locations`

**Method:** `GET`

**Description:** Retrieves all locations for a specific company ID.

**Path Parameters:**

	company_id (int): The ID of the company whose locations to retrieve.

**Response:**

- **Status Code:** `200 OK`
- **Content:**

  ```json
  [
    {
        "location_id": 1,
        "company_id": 1,
        "name": "Company Location Name 1",
        "address": "Company Location 1 Address",
        "latitude": 37.7749,
        "longitude": -122.4194
    },
    {
        "location_id": 2,
        "company_id": 1,
        "name": "Company Location Name 2",
        "address": "Company Location 2 Address",
        "latitude": 37.4419,
        "longitude": -122.1430
    }
  ]