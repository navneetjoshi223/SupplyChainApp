import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CircularProgress, Box, Paper, Button, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
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

const selectedIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [1, -34],
  shadowSize: [82, 82]
});

function MapFlyTo({ selectedLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14);
    }
  }, [selectedLocation, map]);

  return null;
}

function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

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
          <Typography variant="h6" className="app-bar-title">SupplyChainApp</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper elevation={3} className="company-info">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h4" gutterBottom>{company.name}</Typography>
              <Typography variant="h6" gutterBottom>{company.address}</Typography>
            </Box>
            <Button 
              variant="contained" 
              component={Link} 
              to="/" 
              className="back-button"
              startIcon={<ArrowBackIcon />}
            >
              Back to List
            </Button>
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className="locations-card">
              <CardContent>
                <Typography variant="h5" gutterBottom>Locations</Typography>
                {locations.map((location, index) => (
                  <Accordion key={index} onClick={() => handleLocationClick(location)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography variant="subtitle1">{location.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {location.address} <br />
                        <strong>Latitude:</strong> {location.latitude} <br />
                        <strong>Longitude:</strong> {location.longitude}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="map-container">
              <MapContainer
                center={[company.latitude, company.longitude]}
                zoom={13}
                style={{ height: '400px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[company.latitude, company.longitude]} icon={defaultIcon}>
                  <Popup>{company.name}</Popup>
                </Marker>
                {locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={[location.latitude, location.longitude]}
                    icon={selectedLocation && selectedLocation.id === location.id ? selectedIcon : defaultIcon}
                  >
                    <Tooltip>{location.name}</Tooltip>
                    <Popup>{location.name}</Popup>
                  </Marker>
                ))}
                <MapFlyTo selectedLocation={selectedLocation} />
              </MapContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CompanyDetailsPage;