import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CompanyListPage from './CompanyListPage';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('renders CompanyListPage and fetches data', async () => {
  const mockCompanies = [
    { id: 1, name: 'Company 1', address: 'Address 1' },
    { id: 2, name: 'Company 2', address: 'Address 2' },
  ];

  fetch.mockResponseOnce(JSON.stringify(mockCompanies));

  render(
    <Router>
      <CompanyListPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCompanies[0].address)).toBeInTheDocument();
    expect(screen.getByText(mockCompanies[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockCompanies[1].address)).toBeInTheDocument();
  });
});

// test('filters companies by name', async () => {
//   const mockCompanies = [
//     { id: 1, name: 'Company 1', address: 'Address 1' },
//     { id: 2, name: 'Company 2', address: 'Address 2' },
//   ];

//   fetch.mockResponseOnce(JSON.stringify(mockCompanies));

//   render(
//     <Router>
//       <CompanyListPage />
//     </Router>
//   );

//   await waitFor(() => {
//     expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
//     expect(screen.getByText(mockCompanies[1].name)).toBeInTheDocument();
//   });

//   const searchInput = screen.getByPlaceholderText(/search companies/i);
//   fireEvent.change(searchInput, { target: { value: 'Company 1' } });

//   expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
//   expect(screen.queryByText(mockCompanies[1].name)).not.toBeInTheDocument();
// });