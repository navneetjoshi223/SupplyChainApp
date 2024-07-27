import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL + '/companies';

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Company details', data);
        setCompany(data);

        fetch(`${apiUrl}/${id}/locations`)
            .then(response => response.json())
            .then(data => {
                console.log('Location details for the company', data);
                setLocations(data);
            })
      })
      .catch(error => console.error('Error fetching company details:', error));
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