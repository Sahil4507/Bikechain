import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import VerifyPage from './pages/VerifyPage';
import BikeProfilePage from './pages/BikeProfilePage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="verify" element={<VerifyPage />} />
            <Route path="verify/:bikeId" element={<VerifyPage />} />
            <Route path="bike" element={<BikeProfilePage />} />
            <Route path="bike/:bikeId" element={<BikeProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
