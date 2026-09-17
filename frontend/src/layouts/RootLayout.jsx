import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-200">
      <Navbar 
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <main className="flex-1">
        <Outlet context={{ isWalletConnected, setIsWalletConnected, walletAddress, setWalletAddress }} />
      </main>
      <Footer />
    </div>
  );
}
