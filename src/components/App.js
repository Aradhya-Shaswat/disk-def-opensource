import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainPage from './MainPage';
import OptimizerPage from './OptimizerPage';
import UpgradePage from './UpgradePage';
import AutocleanPage from './AutocleanPage';
import PrivacyPage from './PrivacyPage';
import HelpPage from './HelpPage';
import AccountPage from './AccountPage';
import '../styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MainPage />;
      case 'optimizer':
        return <OptimizerPage />;
      case 'upgrade':
        return <UpgradePage />;
      case 'autoclean':
        return <AutocleanPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'help':
        return <HelpPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
