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
import TickIcon from '../tick-mark.png';  

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
    const duration = Math.floor(Math.random() * (10000 - 2000 + 1)) + 5000;
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

const ResultPage = ({ result, onCleanThreats, onBackToHome }) => (
  <div className="main-content">
    {result === 'threat' ? (
      <>
        <h1 className="welcome-message">Threats Detected</h1>
        <p className="description">Your system has detected threats. Please address them immediately.</p>
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
      </>
    ) : (
      <div className="optimizer-container-1">
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
        <div className="main-content">
          <h1 className="welcome-message">Optimization Completed.</h1>
          <p className="description">Your Computer has been successfully optimized! Feel free to resume your work.</p>
          <img src={TickIcon} alt='tick' className="tick-icon" />
          <div className="main-buttons-1">
            <button className="learn-more-button" onClick={onBackToHome}>Back to Home</button>
          </div>
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
      const response = await ipcRenderer.invoke('get-system-info');
      const { cpu, tempFilesSize } = response;

      if (tempFilesSize > 5 || cpu.currentLoad > 60) {
        setResult('threat');
      } else {
        setResult('complete');
      }

      setScanning(false); 
    }, delay);
  };

  const stopScanning = () => setScanning(false);

  const handleCleanThreats = () => {
    setCurrentPage('optimizer');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className={`main-page ${disableSidebar ? 'sidebar-disabled' : ''}`}>
      <TopBar />
      {result ? (
        <ResultPage result={result} onCleanThreats={handleCleanThreats} onBackToHome={handleBackToHome} />
      ) : scanning ? (
        <ScanningPage onStopScanning={stopScanning} disableSidebar={setDisableSidebar} />
      ) : (
        <MainContent onStartScanning={startScanning} />
      )}
    </div>
  );
};

export default MainPage;
