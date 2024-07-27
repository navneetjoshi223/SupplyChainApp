import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL + '/companies';
  console.log('API URL:', apiUrl);  // Debugging line

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCompanies(data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  return (
    <div>
      <h1>Company List</h1>
      <ul>
        {companies.map(company => (
          <li key={company.company_id}>
            <Link to={`/company/${company.company_id}`}>
              {company.name} - {company.address}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyListPage;