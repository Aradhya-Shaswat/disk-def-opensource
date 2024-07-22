import React, { useState } from 'react';
import '../styles/MainPage.css';
import ShieldImage from '../disk_home.png';
import NotificationIcon from '../notification.png';
import SettingsIcon from '../settings.png';
import SpinnerImage from '../spinner.png'; 

const TopBar = () => (
  <div className="top-bar">
    <button className="top-bar-item">
      <img src={NotificationIcon} alt="Notifications" className="top-bar-icon" />
      <span className="top-bar-text">Notifications</span>
    </button>
    <button className="top-bar-item">
      <img src={SettingsIcon} alt="Settings" className="top-bar-icon" />
      <span className="top-bar-text">Settings</span>
    </button>
  </div>
);

const MainContent = ({ onStartScanning }) => (
  <div className="main-content">
    <h1 className="welcome-message">Welcome to Disk Defender</h1>
    <p className="description">Safeguard your files utilizing Disk Defender: offering secure, reliable, and seamless data encryption and backup solutions.</p>
    <div className="main-image-container">
      <div className="main-image">
        <img src={ShieldImage} alt="Security Shield" />
      </div>
    </div>
    <div className="main-buttons">
      <button className="learn-more-button">Learn more.</button>
      <button className="run-scanning-button" onClick={onStartScanning}>Start Scanning</button>
    </div>
  </div>
);

const ScanningPage = ({ onStopScanning }) => (
  <div className="main-content">
   <h1 className="welcome-message">Scanning your system</h1>
    <p className="description">Your system is undergoing a comprehensive scan. Kindly refrain from deactivating your computer during this procedure.</p>
    <div className="main-image-container">
      <div className="main-image-1">
        <img src={SpinnerImage} />
      </div>
    </div>
    <div className="main-buttons">
      <button className="run-scanning-button" onClick={onStopScanning}>Stop Scanning</button>
    </div>
  </div>
  
);

const MainPage = () => {
  const [scanning, setScanning] = useState(false);

  const startScanning = () => setScanning(true);
  const stopScanning = () => setScanning(false);

  return (
    <div className="main-page">
      <TopBar />
      {!scanning ? (
        <MainContent onStartScanning={startScanning} />
      ) : (
        <ScanningPage onStopScanning={stopScanning} />
      )}
    </div>
  );
};

export default MainPage;
