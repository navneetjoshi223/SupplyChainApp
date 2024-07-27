import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, TextField, CircularProgress, Box, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './CompanyListPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

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

  const handleFocus = () => {
    setSearchFocused(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setSearchFocused(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner"><CircularProgress /></div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Company List</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box className={`search-container ${searchFocused ? 'focused' : ''}`}>
          <TextField
            label="Search Companies"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Grid container spacing={3}>
          {filteredCompanies.map(company => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Paper elevation={3} className="card">
                <CardContent className="card-content">
                  <Typography variant="h5" component="div" className="card-title card-text">
                    {company.name}
                  </Typography>
                  <Typography className="card-address card-text">
                    {company.address}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/company/${company.id}`}
                  endIcon={<ArrowForwardIosIcon />}
                  className="view-details-button"
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default CompanyListPage;