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
        return <MainPage setCurrentPage={setCurrentPage} />;
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
        return <MainPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;
