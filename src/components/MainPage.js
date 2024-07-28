import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import ShieldImage from '../disk_home.png';
import NotificationIcon from '../notification.png';
import SettingsIcon from '../settings.png';
import SpinnerImage from '../spinner.png';
import ClockImage from '../clock.png';
import BackgroundImage from '../bg-image.png';
import ThreatRedImage from '../threat-red.png';
import ThreatBgImage from '../threat-bg-image.png';

const { ipcRenderer } = window.require('electron');

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

const ScanningPage = ({ onStopScanning, disableSidebar }) => {
  const [percentage, setPercentage] = useState(0);
  const [disableStop, setDisableStop] = useState(false);

  useEffect(() => {
    disableSidebar(true);
    const duration = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
    const intervalTime = duration / 100;

    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, intervalTime);

    const disableTimeout = setTimeout(() => setDisableStop(true), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(disableTimeout);
      disableSidebar(false);
    };
  }, [disableSidebar]);

  return (
    <div className="main-content">
      <h1 className="welcome-message">Scanning your system</h1>
      <p className="description">Your system is undergoing a comprehensive scan. Please refrain from turning off your system.</p>
      <div className="main-image-container">
        <div className="background-image-container">
          <img src={BackgroundImage} alt="Background" className="background-image" />
        </div>
        <div className="main-image-1">
          <img src={SpinnerImage} alt="Spinner" className="spinner-image" />
          <div className="percentage-counter">
            <img src={ClockImage} alt="Clock" className="clock-icon" />
            {percentage}%
          </div>
        </div>
      </div>
      <div className="main-buttons">
        <button className="run-scanning-button" onClick={onStopScanning} disabled={!disableStop}>Stop Scanning</button>
      </div>
    </div>
  );
};

const ResultPage = ({ result, onCleanThreats }) => (
  <div className="main-content">
    <h1 className="welcome-message">
      {result === 'threat' ? 'Scanning your system' : 'Scanning your system'}
    </h1>
    <p className="description">
      {result === 'threat'
        ? 'Your system is undergoing a comprehensive scan. Please refrain from turning off your system.'
        : 'Your system is undergoing a comprehensive scan. Please refrain from turning off your system.'}
    </p>
    {result === 'threat' && (
      <div>
        <div className="main-image-container">
          <div className="background-image-container">
            <img src={ThreatBgImage} alt="Background" className="background-image" />
          </div>
          <div className="main-image-1">
            <img src={ThreatRedImage} alt="Threat" className="result-image" />
            <p className='threat-text'>THREATS DETECTED!</p>
          </div>
        </div>
        <div className="main-buttons">
          <button className="run-scanning-button" onClick={onCleanThreats}>Clean Threats</button>
        </div>
      </div>
    )}
  </div>
);

const MainPage = ({ setCurrentPage }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [disableSidebar, setDisableSidebar] = useState(false);

  const startScanning = () => {
    setScanning(true);
    setResult(null);
    const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

    setTimeout(async () => {
      const response = await ipcRenderer.invoke('delete-temp-files');
      setResult(response.success ? 'complete' : 'threat');

      setTimeout(() => {
        setScanning(false);
      }, 2000);
    }, delay);
  };

  const stopScanning = () => setScanning(false);

  const handleCleanThreats = () => {
    setCurrentPage('optimizer');
  };

  return (
    <div className={`main-page ${disableSidebar ? 'sidebar-disabled' : ''}`}>
      <TopBar />
      {result ? (
        <ResultPage result={result} onCleanThreats={handleCleanThreats} />
      ) : scanning ? (
        <ScanningPage onStopScanning={stopScanning} disableSidebar={setDisableSidebar} />
      ) : (
        <MainContent onStartScanning={startScanning} />
      )}
    </div>
  );
};

export default MainPage;
