import React from 'react';
import Sidebar from './Sidebar';
import MainPage from './MainPage';
import '../styles/App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <MainPage />
    </div>
  );
};

export default App;
