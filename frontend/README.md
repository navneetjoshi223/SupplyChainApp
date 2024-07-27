## Overview

This is the frontend for the SupplyChainApp, built using React. The application provides a user-friendly interface to view and interact with company data, including a list of companies and detailed information for each company, displayed on a map with location markers.

## Pages and Features

Company List Page

	•	Displays a list or grid of companies fetched from the backend API.
	•	Each company item shows basic information (name, address).
	•	Search and Filter Functionality:
	•	Allows users to search for companies by name.
	•	Navigation:
	•	Clicking on a company navigates to the Company Details Page for detailed information.

Company Details Page

	•	Detailed Information Display:
	•	Shows detailed information about the selected company (name, address).
	•	Map Integration:
	•	Integrates a map component (using Leaflet) to show the company’s main location.
	•	Displays a list of possible locations for the company with markers on the map.
	•	Interactive list items that, when clicked, highlight the corresponding marker on the map.
	•	Location Details:
	•	Lists the locations including name, address, latitude, and longitude.
	•	Navigation:
	•	A “Back to List” button to return to the Company List Page.

## Libraries Used

	•	React: JavaScript library for building user interfaces.
	•	Material-UI: React components for faster and easier web development.
	•	React Router: Declarative routing for React applications.
	•	React-Leaflet: React components for Leaflet maps.
	•	Leaflet: JavaScript library for interactive maps.