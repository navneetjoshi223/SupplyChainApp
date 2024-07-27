import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyListPage from './components/CompanyList/CompanyListPage';
import CompanyDetailsPage from './components/CompanyDetails/CompanyDetailsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyListPage />} />
        <Route path="/company/:id" element={<CompanyDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;