import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import VerifyPage from './pages/VerifyPage';
import BikeProfilePage from './pages/BikeProfilePage';
import DashboardPage from './pages/DashboardPage';
import BikesPage from './pages/BikesPage';
import AboutPage from './pages/AboutPage';
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
            <Route path="bikes" element={<BikesPage />} />
            <Route path="bike" element={<BikeProfilePage />} />
            <Route path="bike/:bikeId" element={<BikeProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
