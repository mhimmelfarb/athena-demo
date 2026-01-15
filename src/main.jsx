import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './LandingPage';
import UserDemo from './UserDemo';
import InvestorDemo from './InvestorDemo';
import PEDashboard from './PEDashboard';
import CompanyDemo from './CompanyDemo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDemo />} />
        <Route path="/investor" element={<InvestorDemo />} />
        <Route path="/pe-dashboard" element={<PEDashboard />} />
        <Route path="/company/:slug" element={<CompanyDemo />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
);
