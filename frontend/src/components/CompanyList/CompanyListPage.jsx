// CompanyListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, TextField, CircularProgress } from '@mui/material';
import './CompanyListPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/companies`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCompanies(data);
        setFilteredCompanies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Company List</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TextField
          label="Search Companies"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {filteredCompanies.map(company => (
            <Grid item xs={12} sm={6} md={4} key={company.company_id}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography variant="h5" component="div" className="card-text">
                    {company.name}
                  </Typography>
                  <Typography color="textSecondary" className="card-text">
                    {company.address}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/company/${company.company_id}`}
                  style={{ margin: '10px' }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default CompanyListPage;