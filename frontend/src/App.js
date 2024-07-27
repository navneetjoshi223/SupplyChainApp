import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyListPage from "./components/CompanyList/CompanyListPage";
import CompanyDetailsPage from "./components/CompanyDetails/CompanyDetailsPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<CompanyListPage />} />
          <Route path="/company/:id" element={<CompanyDetailsPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
