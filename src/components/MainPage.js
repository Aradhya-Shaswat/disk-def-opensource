import React from 'react';
import '../styles/MainPage.css';
import shieldImage from '../disk_home.png';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Welcome to Disk Defender</h1>
        <p>Safeguard your files utilizing Disk Defender: offering secure, reliable, and seamless data encryption and backup solutions.</p>
        <div className="main-buttons">
          <button className="learn-more-button">Learn more</button>
          <button className="run-scanning-button">Run Scanning</button>
        </div>
      </div>
      <div className="main-image">
        <img src={shieldImage} alt="Security Shield" />
      </div>
    </div>
  );
};

export default MainPage;
