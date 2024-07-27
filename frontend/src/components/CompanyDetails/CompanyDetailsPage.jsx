import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, List, ListItem, ListItemText, CircularProgress, Box, Paper, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './CompanyDetailsPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/companies/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setError(error.toString());
      }
    };

    const fetchCompanyLocations = async () => {
      try {
        const response = await fetch(`${apiUrl}/companies/${id}/locations`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching location details:', error);
        setError(error.toString());
      }
    };

    fetchCompanyDetails();
    fetchCompanyLocations();
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading-spinner"><CircularProgress /></div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!company) {
    return <div>No company details available</div>;
  }

  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" className="app-bar-title">Company Details</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper elevation={3} className="company-info">
          <Typography variant="h4" gutterBottom>{company.name}</Typography>
          <Typography variant="h6" gutterBottom>{company.address}</Typography>
        </Paper>
        <MapContainer center={[company.latitude, company.longitude]} zoom={13} style={{ height: '400px', marginBottom: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[company.latitude, company.longitude]} icon={defaultIcon}>
            <Popup>{company.name}</Popup>
          </Marker>
          {locations.map((location, index) => (
            <Marker key={index} position={[location.latitude, location.longitude]} icon={defaultIcon}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <Card className="locations-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>Locations</Typography>
            <List>
              {locations.map((location, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={location.name}
                    secondary={`${location.address} (Lat: ${location.latitude}, Lon: ${location.longitude})`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Box mt={2}>
          <Button variant="contained" color="primary" component={Link} to="/" className="back-button">
            Back to List
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default CompanyDetailsPage;