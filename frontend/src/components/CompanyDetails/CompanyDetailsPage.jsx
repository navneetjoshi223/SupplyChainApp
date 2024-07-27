import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL + '/companies';

  useEffect(() => {
    const fetchCompanyDetails = async () => {
        try {
          const response = await fetch(`${apiUrl}/${id}`);
          if (!response.ok) {
            throw new Error('There was a network error');
          }
          const data = await response.json();
          console.log('Company details', data);
          setCompany(data);
        } catch (error) {
          console.error('Error fetching company details:', error);
          setError(error.toString());
        }
      };
  
      const fetchCompanyLocations = async () => {
        try {
          const response = await fetch(`${apiUrl}/${id}/locations`);
          if (!response.ok) {
            throw new Error('There was a network error');
          }
          const data = await response.json();
          console.log('Location details for the company', data);
          setLocations(data);
        } catch (error) {
          console.error('Error fetching location details for the company:', error);
          setError(error.toString());
        }
      };
  
      fetchCompanyDetails();
      fetchCompanyLocations();
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.address}</p>
      <h2>Locations</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            {location.name} - {location.address} (Lat: {location.latitude}, Lon: {location.longitude})
          </li>
        ))}
      </ul>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default CompanyDetailsPage;