import React from 'react';
import '../styles/MainPage.css';
import shieldImage from '../disk_home.png';
import notificationIcon from '../notification.png';
import settingsIcon from '../settings.png';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="top-bar">
        <button className="top-bar-item">
          <img src={notificationIcon} alt="Notifications" className="top-bar-icon" />
          <span className="top-bar-text">Notifications</span>
        </button>
        <button className="top-bar-item">
          <img src={settingsIcon} alt="Settings" className="top-bar-icon" />
          <span className="top-bar-text">Settings</span>
        </button>
      </div>
      <div className="main-content">
        <h1 className="welcome-message">Welcome to Disk Defender</h1>
        <p className="description">Safeguard your files utilizing Disk Defender: offering secure, reliable, and seamless data encryption and backup solutions.</p>
      </div>
      <div className="main-image-container">
        <div className="main-image">
          <img src={shieldImage} alt="Security Shield" />
        </div>
      </div>
      <div className="main-buttons">
        <button className="learn-more-button">Learn more</button>
        <button className="run-scanning-button">Run Scanning</button>
      </div>
    </div>
  );
};

export default MainPage;
